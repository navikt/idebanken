import { APP_NAME, ComponentRegistry, richTextQuery } from '@enonic/nextjs-adapter'
import { commonQuery, commonVariables } from './queries/common'
import { linkQuery, imageQuery } from './queries/parts'
import MainPage from './pages/Main'

import '@enonic/nextjs-adapter/baseMappings'
import HeadingView from './parts/Heading'
import TwoColumnLayout from './layouts/TwoColumnLayout'
import { ButtonView } from './parts/Button'
import { TextEditorView } from './parts/TextEditor'
import { InfoBoxView } from './parts/InfoBox'
import SingleColumnLayout from './layouts/SingleColumnLayout'
import { TipPanelView } from './parts/TipPanel'
import { AccordionView } from './parts/Accordion'
import { ImageView } from './parts/Image'
import PanelLayoutTwoColumn from './layouts/PanelLayoutTwoColumn'
import { LinkCardView } from './parts/LinkCard'
import TitleIngressView from '~/components/parts/TitleIngress'

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
	view: HeadingView,
})

ComponentRegistry.addPart(`${APP_NAME}:button`, {
	view: ButtonView,
	configQuery: linkQuery,
})

ComponentRegistry.addPart(`${APP_NAME}:image`, {
	view: ImageView,
	configQuery: imageQuery,
})

ComponentRegistry.addPart(`${APP_NAME}:text-editor`, {
	view: TextEditorView,
	configQuery: `{
		${richTextQuery('simpleTextEditor')}
	}`,
})

ComponentRegistry.addPart(`${APP_NAME}:info-box`, {
	view: InfoBoxView,
})

ComponentRegistry.addPart(`${APP_NAME}:tip-panel`, {
	view: TipPanelView,
})

ComponentRegistry.addPart(`${APP_NAME}:accordion`, {
	view: AccordionView,
})

ComponentRegistry.addPart(`${APP_NAME}:link-card`, {
	view: LinkCardView,
	configQuery: linkQuery,
})

ComponentRegistry.addPart(`${APP_NAME}:title-ingress`, {
	view: TitleIngressView,
})
