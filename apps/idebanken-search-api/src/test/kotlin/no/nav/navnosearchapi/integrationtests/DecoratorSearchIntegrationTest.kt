package no.nav.navnosearchapi.integrationtests

import io.kotest.assertions.assertSoftly
import io.kotest.matchers.shouldBe
import io.kotest.matchers.string.shouldContain
import no.nav.navnosearchapi.search.dto.DecoratorSearchResult
import no.nav.navnosearchapi.search.filters.FacetKeys
import no.nav.navnosearchapi.utils.additionalTestData
import no.nav.navnosearchapi.utils.privatpersonDummyData
import no.nav.navnosearchapi.utils.samarbeidspartnerDummyData
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.http.HttpStatus

class DecoratorSearchIntegrationTest : AbstractIntegrationTest() {

    @BeforeEach
    fun setup() {
        setupIndex()
    }

    @Test
    fun `søk med tom term skal returnere alt innhold`() {
        val response = get<DecoratorSearchResult>(decoratorSearchUri(ord = "", f = FacetKeys.PRIVATPERSON))

        response.statusCode shouldBe HttpStatus.OK
        assertSoftly(response.body!!) {
            total shouldBe privatpersonDummyData.size
        }
    }

    @Test
    fun `søk med tekst-term skal returnere riktig søkeresultat`() {
        val text = "dagpenger"

        repository.save(additionalTestData(title = text))
        val response = get<DecoratorSearchResult>(decoratorSearchUri(ord = text))

        response.statusCode shouldBe HttpStatus.OK
        assertSoftly(response.body!!) {
            total shouldBe 1L
            hits.first().displayName shouldBe text
        }
    }

    @Test
    fun `søk med fuzzy tekst-term skal returnere riktig søkeresultat`() {
        val text = "dagpenger"
        val fuzzyText = "dagpegner"

        repository.save(additionalTestData(title = text))
        val response = get<DecoratorSearchResult>(decoratorSearchUri(ord = fuzzyText))

        response.statusCode shouldBe HttpStatus.OK
        assertSoftly(response.body!!) {
            total shouldBe 1L
            hits.first().displayName shouldBe text
        }
    }

    @Test
    fun `søk med frase-term skal returnere riktig søkeresultat`() {
        val frase = "søknad om dagpenger"
        val fraseReversert = frase.split(" ").reversed().joinToString(" ")

        repository.saveAll(
            listOf(
                additionalTestData(title = "blabla $frase blabla"),
                additionalTestData(title = "blabla $fraseReversert blabla"),
            )
        )

        val response = get<DecoratorSearchResult>(decoratorSearchUri(ord = "\"$frase\""))

        response.statusCode shouldBe HttpStatus.OK
        assertSoftly(response.body!!) {
            total shouldBe 1L
            hits.first().displayName shouldContain frase
        }
    }

    @Test
    fun `søk med fasett skal returnere riktig søkeresultat`() {
        val response = get<DecoratorSearchResult>(
            decoratorSearchUri(ord = "", f = FacetKeys.SAMARBEIDSPARTNER)
        )

        response.statusCode shouldBe HttpStatus.OK
        assertSoftly(response.body!!) {
            total shouldBe samarbeidspartnerDummyData.size
        }
    }
}