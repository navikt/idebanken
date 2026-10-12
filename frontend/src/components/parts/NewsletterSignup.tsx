'use client'

import { ButtonView } from '~/components/parts/Button'
import { PartData } from '~/types/graphql-types'
import { XP_NewsletterSignup } from '@xp-types/site/parts'
import { BodyLong, Box, Checkbox, CheckboxGroup, TextField, VStack } from '@navikt/ds-react'
import { HeadingView } from '~/components/parts/Heading'
import { AnalyticsEvents, umami } from '~/utils/analytics/umami'
import BleedingBackgroundPageBlock from '~/components/layouts/BleedingBackgroundPageBlock'

export default function NewsletterSignup({ meta, part, path }: PartData<XP_NewsletterSignup>) {
    const { config } = part
    const { title, description, makeFormUrl } = config || {}

    return (
            <Box
                paddingBlock={{ xs: 'space-24', sm: 'space-44' }}
                paddingInline={{ xs: 'space-16', sm: 'space-32', md: 'space-80' }}
                className={'bg-(--ib-bg-pink-softA) rounded-[24px] w-full h-full'}>
                <HeadingView autoId={false} level="2" size="large">
                    {title}
                </HeadingView>
                <BodyLong className={'mb-(--ax-space-32)'}>{description}</BodyLong>
                <form action={makeFormUrl} method="post" acceptCharset="utf-8" aria-label={title}>
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
                )
}
