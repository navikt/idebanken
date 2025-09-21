package no.nav.idebankensearchapi.service.mapper

import io.kotest.assertions.assertSoftly
import io.kotest.matchers.nulls.shouldNotBeNull
import io.kotest.matchers.shouldBe
import no.nav.idebankensearchapi.admin.service.mapper.toOutbound
import no.nav.idebankensearchapi.utils.TEAM_NAME
import no.nav.idebankensearchapi.utils.dummyContent
import no.nav.navnosearchadminapi.common.constants.ENGLISH
import no.nav.navnosearchadminapi.common.constants.NORWEGIAN_NYNORSK
import org.junit.jupiter.api.Test

class OutboundMapperTest {

    @Test
    fun `skal mappe alle felter riktig`() {
        val content = dummyContent()
        val mappedContent = content.toOutbound()

        assertSoftly(mappedContent) {
            id shouldBe content.id.substringAfter("$TEAM_NAME-")
            href shouldBe content.href
            title shouldBe content.title.no
            ingress shouldBe content.ingress.no
            text shouldBe content.text.no
            metadata.shouldNotBeNull()

            with(metadata!!) {
                type shouldBe content.type
                createdAt shouldBe content.createdAt
                lastUpdated shouldBe content.lastUpdated
                audience shouldBe content.audience
                language shouldBe content.language
                metatags shouldBe content.metatags
                languageRefs shouldBe content.languageRefs
            }
        }
    }

    @Test
    fun `skal mappe tekstfelter på nynorsk riktig`() {
        val content = dummyContent(language = NORWEGIAN_NYNORSK)
        val mappedContent = content.toOutbound()

        assertSoftly(mappedContent) {
            title shouldBe content.title.no
            ingress shouldBe content.ingress.no
            text shouldBe content.text.no
        }
    }

    @Test
    fun `skal mappe tekstfelter på engelsk riktig`() {
        val content = dummyContent(language = ENGLISH)
        val mappedContent = content.toOutbound()

        assertSoftly(mappedContent) {
            title shouldBe content.title.en
            ingress shouldBe content.ingress.en
            text shouldBe content.text.en
        }
    }

    @Test
    fun `skal mappe tekstfelter på andre språk riktig`() {
        val content = dummyContent(language = "se")
        val mappedContent = content.toOutbound()

        mappedContent.title shouldBe content.title.other
        mappedContent.ingress shouldBe content.ingress.other
        mappedContent.text shouldBe content.text.other
    }
}