'use client'

import { useActionState, useEffect } from 'react'
import { ButtonView } from '~/components/parts/Button'
import { PartData } from '~/types/graphql-types'
import { XP_NewsletterSignup } from '@xp-types/site/parts'
import Form from 'next/form'
import {
    BodyLong,
    Box,
    Checkbox,
    CheckboxGroup,
    InlineMessage,
    TextField,
    VStack,
} from '@navikt/ds-react'
import { HeadingView } from '~/components/parts/Heading'
import { newsletterSignup } from '~/utils/actions'
import { useRouter } from 'next/navigation'
import { enonicSitePathToHref } from '~/utils/utils'
import { AnalyticsEvents, umami } from '~/utils/analytics/umami'

export default function NewsletterSignup({
    meta,
    part,
}: PartData<XP_NewsletterSignup & { redirectContent?: { _path?: string } }>) {
    const [state, formAction] = useActionState(newsletterSignup, {})
    const router = useRouter()

    const { config } = part
    const { title, description, redirectContent } = config || {}

    useEffect(() => {
        if (state.success && redirectContent?._path) {
            router.push(enonicSitePathToHref(redirectContent._path))
        }
    }, [state, router, redirectContent])

    return (
        <Box
            className={
                'bg-(--ib-bg-orange-softA) rounded-[24px] p-(--ax-space-44) px-(--ax-space-80)'
            }>
            <HeadingView autoId={false} level="2" size="large">
                {title}
            </HeadingView>
            <BodyLong className={'mb-(--ax-space-32)'}>{description}</BodyLong>
            <Form action={formAction} label={title}>
                <VStack gap={'space-24'} className={''}>
                    <TextField
                        label={'honningkrukke'}
                        name="honningkrukke"
                        type="text"
                        className={'hidden'}
                    />
                    <TextField
                        name="email"
                        type="text"
                        inputMode={'email'}
                        className={'max-w-96 mt-(--ax-space-8)'}
                        label={'E-postadresse'}
                        autoComplete={'email'}
                        error={state.emailError as string | undefined}
                        defaultValue={
                            (state.previousValues as Record<string, string> | undefined)?.email ||
                            ''
                        }
                    />
                    <CheckboxGroup
                        legend={'Samtykke for abonnering'}
                        hideLegend
                        error={state.consentError as string | undefined}
                        defaultValue={[
                            (state.previousValues as Record<string, string> | undefined)?.consent,
                        ]}>
                        <Checkbox value={'consent'} name="consent">
                            Jeg ønsker å abonnere
                        </Checkbox>
                    </CheckboxGroup>
                    {state.fetchError && (
                        <InlineMessage status="error">{state.fetchError as string}</InlineMessage>
                    )}
                    <ButtonView
                        type="submit"
                        config={{ variant: 'primary', size: 'medium' }}
                        className={'mt-(--ax-space-8) px-20 self-center!'}
                        onClick={() =>
                            void umami(AnalyticsEvents.BUTTON_CLICKED, {
                                knappId: 'newsletter-subscribe',
                            })
                        }
                        meta={meta}>
                        Meld meg på
                    </ButtonView>
                </VStack>
            </Form>
        </Box>
    )
}
