import {
    GlobalAlert,
    GlobalAlertContent,
    GlobalAlertHeader,
    GlobalAlertProps,
    GlobalAlertTitle,
} from '@navikt/ds-react/GlobalAlert'
import type { JSX } from 'react'

export const ContentEditorMessage = ({
    title,
    content,
    status,
}: {
    title: string | JSX.Element
    content?: string | JSX.Element
    status: GlobalAlertProps['status']
}) => {
    return (
        <GlobalAlert
            status={status}
            className={'fixed bottom-0 left-1/2 -translate-x-1/2 w-full z-[99999]'}>
            <GlobalAlertHeader>
                <GlobalAlertTitle>{title}</GlobalAlertTitle>
            </GlobalAlertHeader>
            {content && <GlobalAlertContent>{content}</GlobalAlertContent>}
        </GlobalAlert>
    )
}
