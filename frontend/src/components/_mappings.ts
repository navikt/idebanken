import { APP_NAME, ComponentRegistry, richTextQuery } from '@enonic/nextjs-adapter'
import { commonQuery, commonVariables } from './queries/common'
import {
    buttonQuery,
    downloadsQuery,
    highlightedBoxMacroQuery,
    imageQuery,
    linkCardListQuery,
    linkCardQuery,
    newsletterQuery,
    tableOfContentsQuery,
    themeCardListQuery,
    videoPartOrMacroQuery,
} from './queries/parts'
import MainPage from './pages/Main'
import '@enonic/nextjs-adapter/baseMappings'
import TwoColumnLayout from './layouts/TwoColumnLayout'
import { ButtonPart } from './parts/Button'
import { TextEditorView } from './parts/TextEditor'
import SingleColumnLayout from './layouts/SingleColumnLayout'
import { AccordionView } from './parts/Accordion'
import { ImageView } from './parts/Image'
import { LinkCardPartView } from './parts/LinkCard'
import TitleIngressView from '~/components/parts/TitleIngress'
import { HeadingViewPart } from '~/components/parts/Heading'
import CrashCourse from '~/components/contentType/CrashCourse'
import SearchView from '~/components/parts/SearchView'
import ThreeColumnLayout from './layouts/ThreeColumnLayout'
import { TableOfContents } from '~/components/parts/TableOfContents'
import { Downloads } from '~/components/parts/Downloads'
import { Separator } from '~/components/macros/Separator'
import { FullWidth } from '~/components/pages/FullWidth'
import { TextWidth } from '~/components/pages/TextWidth'
import { LinkCardList } from '~/components/parts/LinkCardList'
import CardLayout from './layouts/CardLayout'
import { ExpansionCardView } from './parts/ExpansionCard'
import { HighlightedBox } from '~/components/macros/HighlightedBox'
import Skyra from '~/components/parts/Skyra'
import NewsletterSignup from '~/components/parts/NewsletterSignup'
import ShowMorePart from '~/components/parts/ShowMorePart'
import { VideoPreview } from '~/components/contentType/VideoPreview'
import { VideoPartOrMacro } from '~/components/parts/VideoPartOrMacro'
import { videoContentTypeQuery } from '~/components/queries/content-types'
import { ArticlesLinkCardList } from '~/components/parts/ArticlesLinkCardList'
import { CookieConsentToggle } from '~/components/common/cookies/CookieConsentToggle'
import { CookieBannerOpenButton } from '~/components/common/cookies/CookieBannerOpenButton'
import ThemeCardList from '~/components/parts/ThemeListCard'
import { articleListProcessor, getArticleData } from './queries/articlesList'
import { QuotePartOrMacro } from './parts/QuotePartOrMacro'
import RelatedTopics from './parts/RelatedTopics'
import { CrashCoursePlan } from '~/components/common/crash-course/CrashCoursePlan'

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

ComponentRegistry.addContentType(`${APP_NAME}:video`, {
    view: VideoPreview,
    query: videoContentTypeQuery,
})

// Page mappings
ComponentRegistry.addPage(`${APP_NAME}:main`, {
    view: MainPage,
})
ComponentRegistry.addPage(`${APP_NAME}:full-width`, {
    view: FullWidth,
})
ComponentRegistry.addPage(`${APP_NAME}:text-width`, {
    view: TextWidth,
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
ComponentRegistry.addLayout(`${APP_NAME}:card`, {
    view: CardLayout,
})

// Macro mappings
ComponentRegistry.addMacro(`${APP_NAME}:separator`, {
    view: Separator,
})
ComponentRegistry.addMacro(`${APP_NAME}:highlighted-box`, {
    view: HighlightedBox,
    configQuery: highlightedBoxMacroQuery,
})
ComponentRegistry.addMacro(`${APP_NAME}:video`, {
    view: VideoPartOrMacro,
    configQuery: videoPartOrMacroQuery,
})

ComponentRegistry.addMacro(`${APP_NAME}:quote`, {
    view: QuotePartOrMacro,
    configQuery: `{
        body
        source
    }`,
})

// Part mappings
ComponentRegistry.addPart(`${APP_NAME}:newsletter-signup`, {
    view: NewsletterSignup,
    configQuery: newsletterQuery,
})

ComponentRegistry.addPart(`${APP_NAME}:heading`, {
    view: HeadingViewPart,
})

ComponentRegistry.addPart(`${APP_NAME}:button`, {
    view: ButtonPart,
    configQuery: buttonQuery,
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

ComponentRegistry.addPart(`${APP_NAME}:table-of-contents`, {
    view: TableOfContents,
    configQuery: tableOfContentsQuery,
})

ComponentRegistry.addPart(`${APP_NAME}:downloads`, {
    view: Downloads,
    configQuery: downloadsQuery,
})

ComponentRegistry.addPart(`${APP_NAME}:link-card-list`, {
    view: LinkCardList,
    configQuery: linkCardListQuery,
})

ComponentRegistry.addPart(`${APP_NAME}:article-card-list`, {
    query: getArticleData,
    processor: articleListProcessor,
    view: ArticlesLinkCardList,
})

ComponentRegistry.addPart(`${APP_NAME}:theme-card-list`, {
    view: ThemeCardList,
    configQuery: themeCardListQuery,
})

ComponentRegistry.addPart(`${APP_NAME}:expansion-card`, {
    view: ExpansionCardView,
    configQuery: `{
        header
        description
        brand
        ${richTextQuery('simpleTextEditor')}
    }`,
})

ComponentRegistry.addPart(`${APP_NAME}:skyra`, {
    view: Skyra,
})

ComponentRegistry.addPart(`${APP_NAME}:show-more`, {
    view: ShowMorePart,
    configQuery: `{
        title
        ${richTextQuery('simpleTextEditor')}
    }`,
})

ComponentRegistry.addPart(`${APP_NAME}:video`, {
    view: VideoPartOrMacro,
    configQuery: videoPartOrMacroQuery,
})

ComponentRegistry.addPart(`${APP_NAME}:quote`, {
    view: QuotePartOrMacro,
    configQuery: `{
        body
        source
    }`,
})

ComponentRegistry.addPart(`${APP_NAME}:cookie-consent-toggle`, {
    view: CookieConsentToggle,
})

ComponentRegistry.addPart(`${APP_NAME}:cookie-consent-open`, {
    view: CookieBannerOpenButton,
})

ComponentRegistry.addPart(`${APP_NAME}:related-topics`, {
    view: RelatedTopics,
})

ComponentRegistry.addPart(`${APP_NAME}:crash-course-plan`, {
    view: CrashCoursePlan,
    configQuery: `{
        title
        parts(path: $path)
    }`,
})
