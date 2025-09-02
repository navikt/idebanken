package no.nav.idebankensearchapi.service.mapper

import io.kotest.assertions.assertSoftly
import io.kotest.matchers.nulls.shouldBeNull
import io.kotest.matchers.shouldBe
import no.nav.idebankensearchapi.admin.service.mapper.toInbound
import no.nav.idebankensearchapi.utils.HINDI
import no.nav.idebankensearchapi.utils.TEAM_NAME
import no.nav.idebankensearchapi.utils.dummyContentDto
import no.nav.idebankensearchapi.utils.fixedNow
import no.nav.navnosearchadminapi.common.constants.ENGLISH
import no.nav.navnosearchadminapi.common.constants.NORWEGIAN
import no.nav.navnosearchadminapi.common.constants.NORWEGIAN_BOKMAAL
import no.nav.navnosearchadminapi.common.constants.NORWEGIAN_NYNORSK
import no.nav.navnosearchadminapi.common.enums.ValidMetatags
import no.nav.navnosearchadminapi.common.enums.ValidTypes
import org.junit.jupiter.api.Test

class InboundMapperTest {

    @Test
    fun `skal mappe alle felter riktig`() {
        val contentDto = dummyContentDto()
        val mappedContent = contentDto.toInbound(TEAM_NAME)

        assertSoftly(mappedContent) {
            id shouldBe "$TEAM_NAME-${contentDto.id}"
            teamOwnedBy shouldBe TEAM_NAME
            href shouldBe contentDto.href
            title.value shouldBe contentDto.title
            ingress.value shouldBe contentDto.ingress
            text.value shouldBe contentDto.text
            allText.value shouldBe with(contentDto) { "$title, $ingress, $text" }
            type shouldBe contentDto.metadata!!.type
            createdAt shouldBe contentDto.metadata!!.createdAt
            lastUpdated shouldBe contentDto.metadata!!.lastUpdated
            audience shouldBe contentDto.metadata!!.audience
            language shouldBe contentDto.metadata!!.language
            metatags shouldBe contentDto.metadata!!.metatags
            languageRefs shouldBe contentDto.metadata!!.languageRefs
        }
    }

    @Test
    fun `skal inkludere type i allText for skjema`() {
        val contentDto = dummyContentDto(type = ValidTypes.SKJEMA.descriptor)
        val mappedContent = contentDto.toInbound(TEAM_NAME)

        mappedContent.allText.value shouldBe with(contentDto) { "$title, $ingress, $text, ${metadata!!.type}" }
    }

    @Test
    fun `skal bruke createdAt som sortByDate for nyheter`() {
        val contentDto = dummyContentDto(
            metatags = listOf(ValidMetatags.NYHET.descriptor),
            createdAt = fixedNow,
            lastUpdated = fixedNow.plusDays(1)
        )
        val mappedContent = contentDto.toInbound(TEAM_NAME)

        mappedContent.sortByDate shouldBe contentDto.metadata!!.createdAt
    }

    @Test
    fun `skal filtrere ut innholdets språk fra languageRefs`() {
        val contentDto = dummyContentDto(
            language = NORWEGIAN_BOKMAAL,
            languageRefs = listOf(NORWEGIAN_BOKMAAL, NORWEGIAN_NYNORSK, ENGLISH)
        )
        val mappedContent = contentDto.toInbound(TEAM_NAME)

        mappedContent.languageRefs shouldBe listOf(NORWEGIAN_NYNORSK, ENGLISH)
    }

    @Test
    fun `skal filtrere ut html fra text`() {
        val textWithHtml = "<p>Text with</p> html <br/>"
        val expectedFilteredText = "Text with html"

        val contentDto = dummyContentDto(text = textWithHtml)
        val mappedContent = contentDto.toInbound(TEAM_NAME)

        mappedContent.text.value shouldBe expectedFilteredText
    }

    @Test
    fun `skal filtrere ut macros fra text`() {
        val textWithMacros = "Text with macro[macro/]"
        val expectedFilteredText = "Text with macro"

        val contentDto = dummyContentDto(text = textWithMacros)
        val mappedContent = contentDto.toInbound(TEAM_NAME)

        mappedContent.text.value shouldBe expectedFilteredText
    }

    @Test
    fun `skal defaulte manglende metatag til informasjon`() {
        val contentDto = dummyContentDto(metatags = emptyList())
        val mappedContent = contentDto.toInbound(TEAM_NAME)

        mappedContent.metatags shouldBe listOf(ValidMetatags.INFORMASJON.descriptor)
    }

    @Test
    fun `skal mappe bokmål til no-felter`() {
        val contentDto = dummyContentDto(language = NORWEGIAN_BOKMAAL)
        val mappedContent = contentDto.toInbound(TEAM_NAME)

        assertSoftly(mappedContent) {
            title.no shouldBe contentDto.title
            ingress.no shouldBe contentDto.ingress
            text.no shouldBe contentDto.text
            title.en.shouldBeNull()
            ingress.en.shouldBeNull()
            text.en.shouldBeNull()
            title.other.shouldBeNull()
            ingress.other.shouldBeNull()
            text.other.shouldBeNull()
        }
    }

    @Test
    fun `skal mappe nynorsk til no-felter`() {
        val contentDto = dummyContentDto(language = NORWEGIAN_NYNORSK)
        val mappedContent = contentDto.toInbound(TEAM_NAME)

        assertSoftly(mappedContent) {
            title.no shouldBe contentDto.title
            ingress.no shouldBe contentDto.ingress
            text.no shouldBe contentDto.text
            title.en.shouldBeNull()
            ingress.en.shouldBeNull()
            text.en.shouldBeNull()
            title.other.shouldBeNull()
            ingress.other.shouldBeNull()
            text.other.shouldBeNull()
        }
    }

    @Test
    fun `skal mappe engelsk til en-felter`() {
        val contentDto = dummyContentDto(language = ENGLISH)
        val mappedContent = contentDto.toInbound(TEAM_NAME)

        assertSoftly(mappedContent) {
            title.en shouldBe contentDto.title
            ingress.en shouldBe contentDto.ingress
            text.en shouldBe contentDto.text
            title.no.shouldBeNull()
            ingress.no.shouldBeNull()
            text.no.shouldBeNull()
            title.other.shouldBeNull()
            ingress.other.shouldBeNull()
            text.other.shouldBeNull()
        }
    }

    @Test
    fun `skal mappe andre språk til other-felter`() {
        val contentDto = dummyContentDto(language = HINDI)
        val mappedContent = contentDto.toInbound(TEAM_NAME)

        assertSoftly(mappedContent) {
            title.other shouldBe contentDto.title
            ingress.other shouldBe contentDto.ingress
            text.other shouldBe contentDto.text
            title.en.shouldBeNull()
            ingress.en.shouldBeNull()
            text.en.shouldBeNull()
            title.no.shouldBeNull()
            ingress.no.shouldBeNull()
            text.no.shouldBeNull()
        }
    }

    @Test
    fun `skal mappe generisk norsk språkkode til bokmål`() {
        val contentDto = dummyContentDto(language = NORWEGIAN)
        val mappedContent = contentDto.toInbound(TEAM_NAME)

        assertSoftly(mappedContent) {
            language shouldBe NORWEGIAN_BOKMAAL
            title.no shouldBe contentDto.title
            ingress.no shouldBe contentDto.ingress
            text.no shouldBe contentDto.text
            title.en.shouldBeNull()
            ingress.en.shouldBeNull()
            text.en.shouldBeNull()
            title.other.shouldBeNull()
            ingress.other.shouldBeNull()
            text.other.shouldBeNull()
        }
    }
}