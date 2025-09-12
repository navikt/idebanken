import { APP_NAME, ComponentRegistry, richTextQuery } from '@enonic/nextjs-adapter'
import { commonQuery, commonVariables } from './queries/common'
import {
    imageQuery,
    linkCardListQuery,
    linkCardQuery,
    linkQuery,
    sectionGuidesLinkQuery,
    tableOfContentsQuery,
    tableOfContentsSectionQuery,
} from './queries/parts'
import MainPage from './pages/Main'
import '@enonic/nextjs-adapter/baseMappings'
import TwoColumnLayout from './layouts/TwoColumnLayout'
import { ButtonView } from './parts/Button'
import { TextEditorView } from './parts/TextEditor'
import { InfoBoxContainerView } from './parts/InfoBoxContainer'
import SingleColumnLayout from './layouts/SingleColumnLayout'
import { TipPanelView } from './parts/TipPanel'
import { AccordionView } from './parts/Accordion'
import { ImageView } from './parts/Image'
import { LinkCardPartView } from './parts/LinkCard'
import TitleIngressView from '~/components/parts/TitleIngress'
import { HeadingViewPart } from '~/components/parts/Heading'
import CrashCourse from '~/components/contentType/CrashCourse'
import SearchView from '~/components/parts/SearchView'
import ThreeColumnLayout from './layouts/ThreeColumnLayout'
import { SectionGuidesView } from './parts/SectionGuides'
import { TableOfContents } from '~/components/parts/TableOfContents'
import { TableOfContentsSection } from '~/components/parts/TableOfContentsSection'
import { Downloads } from '~/components/parts/Downloads'
import { Separator } from '~/components/macros/Separator'
import { FullWidth } from '~/components/pages/FullWidth'
import { LinkCardList } from '~/components/parts/LinkCardList'

/**
 * DO NOT IMPORT richTextQuery IN OTHER LOCATIONS THAN THIS FILE
 * @external richTextQuery
 * There is an issue causing the default ComponentRegistry macro queries to not work properly
 */

// You can set common query for all views here
ComponentRegistry.setCommonQuery([commonQuery, commonVariables])

// Content type mappings
ComponentRegistry.addContentType(`${APP_NAME}:crash-course`, {
    view: CrashCourse,
})

// Page mappings
ComponentRegistry.addPage(`${APP_NAME}:main`, {
    view: MainPage,
})
ComponentRegistry.addPage(`${APP_NAME}:full-width`, {
    view: FullWidth,
})

// Layout mappings
ComponentRegistry.addLayout(`${APP_NAME}:single-column`, {
    view: SingleColumnLayout,
})
ComponentRegistry.addLayout(`${APP_NAME}:2-column`, {
    view: TwoColumnLayout,
})
ComponentRegistry.addLayout(`${APP_NAME}:3-column`, {
    view: ThreeColumnLayout,
})

// Macro mappings
ComponentRegistry.addMacro(`${APP_NAME}:separator`, {
    view: Separator,
})

// Part mappings
ComponentRegistry.addPart(`${APP_NAME}:heading`, {
    view: HeadingViewPart,
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
    view: InfoBoxContainerView,
    configQuery: `{
		infoBoxItems {
			bgColor
			${richTextQuery('simpleTextEditor')}
		}
	}`,
})

ComponentRegistry.addPart(`${APP_NAME}:tip-panel`, {
    view: TipPanelView,
    configQuery: `{
		bgColor
		heading
		reverse
		panel {
			bgColor
			${richTextQuery('simpleTextEditor')}
		}
	}`,
})

ComponentRegistry.addPart(`${APP_NAME}:accordion`, {
    view: AccordionView,
    configQuery: `{
		accordionItems {
			header
			${richTextQuery('simpleTextEditor')}
		}
	}`,
})

ComponentRegistry.addPart(`${APP_NAME}:link-card`, {
    view: LinkCardPartView,
    configQuery: linkCardQuery,
})

ComponentRegistry.addPart(`${APP_NAME}:title-ingress`, {
    view: TitleIngressView,
})

ComponentRegistry.addPart(`${APP_NAME}:search-view`, {
    view: SearchView,
})

ComponentRegistry.addPart(`${APP_NAME}:section-guides-view`, {
    view: SectionGuidesView,
    configQuery: sectionGuidesLinkQuery,
})

ComponentRegistry.addPart(`${APP_NAME}:table-of-contents`, {
    view: TableOfContents,
    configQuery: tableOfContentsQuery,
})

ComponentRegistry.addPart(`${APP_NAME}:table-of-contents-section`, {
    view: TableOfContentsSection,
    configQuery: tableOfContentsSectionQuery,
})

ComponentRegistry.addPart(`${APP_NAME}:downloads`, {
    view: Downloads,
    configQuery: `{
        selectedFiles {
            displayName
            _path
            ... on media_Document {
                mediaUrl(type: absolute)
                attachments {
                    size
                }
            }
        }
  }`,
})

ComponentRegistry.addPart(`${APP_NAME}:link-card-list`, {
    view: LinkCardList,
    configQuery: linkCardListQuery,
})
