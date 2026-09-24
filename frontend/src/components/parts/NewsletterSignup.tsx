'use client'

import { ButtonView } from '~/components/parts/Button'
import { PartData } from '~/types/graphql-types'
import { XP_NewsletterSignup } from '@xp-types/site/parts'
import { BodyLong, Box, Checkbox, CheckboxGroup, TextField, VStack } from '@navikt/ds-react'
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
                    action={MAKE_FORM_ACTION_URL}
                    method="post"
                    acceptCharset="utf-8"
                    aria-label={title}>
                    <VStack gap={'space-24'}>
                        <TextField
                            name="email"
                            type="email"
                            inputMode={'email'}
                            className={'max-w-96 mt-(--ax-space-8)'}
                            label={'E-postadresse (Påkrevd)'}
                            autoComplete={'email'}
                            required
                        />
                        <CheckboxGroup legend={'Samtykke (Påkrevd)'}>
                            <Checkbox value={'1'} name="custom_fields[SAMTYKKEEPOST]" required>
                                Jeg bekrefter at jeg ønsker å motta nyhetsbrev fra Idébanken
                            </Checkbox>
                        </CheckboxGroup>
                        <ButtonView
                            type="submit"
                            config={{ variant: 'primary', size: 'medium' }}
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
