import { CATCH_ALL, ComponentRegistry, APP_NAME } from '@enonic/nextjs-adapter'
import PropsView from '@enonic/nextjs-adapter/views/PropsView'
import { commonQuery, commonVariables } from './queries/common'
import MainPage from './pages/Main'

import '@enonic/nextjs-adapter/baseMappings'
import Heading from './parts/Heading'
import TwoColumnLayout from './layouts/TwoColumnLayout'
import { ButtonView } from './parts/Button'
import { TextEditorView } from './parts/TextEditor'
import { InfoBoxView } from './parts/InfoBox'
import { DoubleInfoBoxView } from './parts/DoubleInfoBox'
import SingleColumnLayout from './layouts/SingleColumnLayout'
import { TipPanelView } from './parts/TipPanel'
import { AccordionView } from './parts/Accordion'
import PanelLayoutTwoColumn from './layouts/PanelLayoutTwoColumn'
import { LinkPanelView } from './parts/LinkPanel'

// You can set common query for all views here
ComponentRegistry.setCommonQuery([commonQuery, commonVariables])

// Content type mappings

// Page mappings
ComponentRegistry.addPage(`${APP_NAME}:main`, {
    view: MainPage,
})

// Layout mappings
ComponentRegistry.addLayout(`${APP_NAME}:single-column`, {
    view: SingleColumnLayout,
})
ComponentRegistry.addLayout(`${APP_NAME}:2-column`, {
    view: TwoColumnLayout,
})
ComponentRegistry.addLayout(`${APP_NAME}:panel-2-column`, {
    view: PanelLayoutTwoColumn,
})

// Part mappings
ComponentRegistry.addPart(`${APP_NAME}:heading`, {
    view: Heading,
})

ComponentRegistry.addPart(`${APP_NAME}:button`, {
    view: ButtonView,
})

ComponentRegistry.addPart(`${APP_NAME}:text-editor`, {
    view: TextEditorView,
})

ComponentRegistry.addPart(`${APP_NAME}:info-box`, {
    view: InfoBoxView,
})

ComponentRegistry.addPart(`${APP_NAME}:double-info-box`, {
    view: DoubleInfoBoxView,
})

ComponentRegistry.addPart(`${APP_NAME}:tip-panel`, {
    view: TipPanelView,
})

ComponentRegistry.addPart(`${APP_NAME}:accordion`, {
    view: AccordionView,
})

ComponentRegistry.addPart(`${APP_NAME}:link-panel`, {
    view: LinkPanelView,
})

// Debug
// ComponentRegistry.addContentType(CATCH_ALL, {
//     view: PropsView
// });
