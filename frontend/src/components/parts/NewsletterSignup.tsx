'use client'

import { useRef, useState } from 'react'
import { ButtonView } from '~/components/parts/Button'
import { PartData } from '~/types/graphql-types'
import { XP_NewsletterSignup } from '@xp-types/site/parts'
import { Alert, BodyLong, Box, Checkbox, CheckboxGroup, TextField, VStack } from '@navikt/ds-react'
import { HeadingView } from '~/components/parts/Heading'
import { AnalyticsEvents, umami } from '~/utils/analytics/umami'
import BleedingBackgroundPageBlock from '~/components/layouts/BleedingBackgroundPageBlock'

// Offentlig skjema-endepunkt fra Make — samme URL som i Makes egen embed-kode.
// Innsending fra nettleseren trigget dobbel opt-in og velkomst-epost.
const MAKE_FORM_ACTION_URL =
    'https://nyhetsbrev.idebanken.no/p/s/MjY1Nzk6Y2RiNmZhYjctMjMwMS00OTM5LWE1ZDItYjRjMmJlZmQ1Njg5'

export default function NewsletterSignup({ meta, part, path }: PartData<XP_NewsletterSignup>) {
    const { config } = part
    const { title, description } = config || {}

    const formRef = useRef<HTMLFormElement>(null)
    const [status, setStatus] = useState<'idle' | 'checking' | 'already-subscribed'>('idle')
    const [emailError, setEmailError] = useState<string>()
    const [consentError, setConsentError] = useState<string>()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const email = (formData.get('email') as string)?.trim()
        const consentGiven = formData.get('custom_fields[SAMTYKKEEPOST]') === '1'

        const newEmailError = !email
            ? 'Du må fylle ut e-postadressen din'
            : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
              ? 'E-postadressen ser ikke riktig ut'
              : undefined
        const newConsentError = !consentGiven
            ? 'Du må bekrefte at du ønsker å motta nyhetsbrevet'
            : undefined

        setEmailError(newEmailError)
        setConsentError(newConsentError)
        if (newEmailError || newConsentError) return

        setStatus('checking')
        try {
            const res = await fetch('/api/newsletter-status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })
            const { subscribed } = await res.json()
            if (subscribed) {
                setStatus('already-subscribed')
                return
            }
        } catch {
            // Ved feil: la innsendingen gå videre (fail-open)
        }
        setStatus('idle')
        formRef.current?.submit()
    }

    return (
        <BleedingBackgroundPageBlock
            bgColor={'bg-(--ib-bg-orange-softA) sm:bg-transparent'}
            layoutPath={path}>
            <Box
                className={
                    'sm:bg-(--ib-bg-orange-softA) rounded-[24px] py-(--ax-space-44) sm:px-(--ax-space-80)'
                }>
                <HeadingView autoId={false} level="2" size="large">
                    {title}
                </HeadingView>
                <BodyLong className={'mb-(--ax-space-32)'}>{description}</BodyLong>
                <form
                    ref={formRef}
                    action={MAKE_FORM_ACTION_URL}
                    method="post"
                    acceptCharset="utf-8"
                    aria-label={title}
                    noValidate
                    onSubmit={handleSubmit}>
                    <VStack gap={'space-24'}>
                        <TextField
                            name="email"
                            type="email"
                            inputMode={'email'}
                            className={'max-w-96 mt-(--ax-space-8)'}
                            label={'E-postadresse (Påkrevd)'}
                            autoComplete={'email'}
                            error={emailError}
                            onChange={() => {
                                setEmailError(undefined)
                                if (status === 'already-subscribed') setStatus('idle')
                            }}
                        />
                        <CheckboxGroup
                            legend={'Samtykke (Påkrevd)'}
                            error={consentError}
                            onChange={() => setConsentError(undefined)}>
                            <Checkbox value={'1'} name="custom_fields[SAMTYKKEEPOST]">
                                Jeg bekrefter at jeg ønsker å motta nyhetsbrev fra Idébanken
                            </Checkbox>
                        </CheckboxGroup>
                        {status === 'already-subscribed' && (
                            <Alert variant="info">
                                Denne e-postadressen er allerede påmeldt nyhetsbrevet.
                            </Alert>
                        )}
                        <ButtonView
                            type="submit"
                            config={{ variant: 'primary', size: 'medium' }}
                            disabled={status === 'checking'}
                            className={'mt-(--ax-space-8) px-20 self-center! max-sm:w-full'}
                            onClick={() =>
                                void umami(AnalyticsEvents.BUTTON_CLICKED, {
                                    knappId: 'newsletter-subscribe',
                                })
                            }
                            meta={meta}>
                            Registrer
                        </ButtonView>
                    </VStack>
                </form>
            </Box>
        </BleedingBackgroundPageBlock>
    )
}
