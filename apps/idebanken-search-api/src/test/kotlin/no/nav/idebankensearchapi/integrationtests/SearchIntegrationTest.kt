package no.nav.idebankensearchapi.integrationtests

import io.kotest.assertions.assertSoftly
import io.kotest.matchers.shouldBe
import io.kotest.matchers.string.shouldContain
import no.nav.idebankensearchapi.search.dto.SearchResult
import no.nav.idebankensearchapi.search.filters.FacetKeys
import no.nav.idebankensearchapi.search.filters.UnderFacetKeys
import no.nav.idebankensearchapi.utils.additionalTestData
import no.nav.idebankensearchapi.utils.aggregationCount
import no.nav.idebankensearchapi.utils.allUnderaggregationCounts
import no.nav.idebankensearchapi.utils.analyserOgForskningDummyData
import no.nav.idebankensearchapi.utils.arbeidsgiverDummyData
import no.nav.idebankensearchapi.utils.generatedText
import no.nav.idebankensearchapi.utils.presseDummyData
import no.nav.idebankensearchapi.utils.privatpersonDummyData
import no.nav.idebankensearchapi.utils.samarbeidspartnerDummyData
import no.nav.idebankensearchapi.utils.statistikkDummyData
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.http.HttpStatus

class SearchIntegrationTest : AbstractIntegrationTest() {
    @BeforeEach
    fun setup() {
        setupIndex()
    }

    @Test
    fun `søk med tom term skal returnere alt innhold`() {
        val response = get<SearchResult>(searchUri(ord = "", f = FacetKeys.PRIVATPERSON))

        response.statusCode shouldBe HttpStatus.OK
        assertSoftly(response.body!!) {
            total shouldBe privatpersonDummyData.size

            aggregationCount(FacetKeys.PRIVATPERSON) shouldBe privatpersonDummyData.size
            allUnderaggregationCounts(FacetKeys.PRIVATPERSON).forEach { it shouldBe generatedText.size }

            aggregationCount(FacetKeys.ARBEIDSGIVER) shouldBe arbeidsgiverDummyData.size
            allUnderaggregationCounts(FacetKeys.ARBEIDSGIVER).forEach { it shouldBe generatedText.size }

            aggregationCount(FacetKeys.SAMARBEIDSPARTNER) shouldBe samarbeidspartnerDummyData.size
            allUnderaggregationCounts(FacetKeys.SAMARBEIDSPARTNER).forEach { it shouldBe generatedText.size }

            aggregationCount(FacetKeys.PRESSE) shouldBe presseDummyData.size

            aggregationCount(FacetKeys.STATISTIKK) shouldBe statistikkDummyData.size
            allUnderaggregationCounts(FacetKeys.STATISTIKK).forEach { it shouldBe generatedText.size }

            aggregationCount(FacetKeys.ANALYSER_OG_FORSKNING) shouldBe analyserOgForskningDummyData.size
            allUnderaggregationCounts(FacetKeys.ANALYSER_OG_FORSKNING).forEach { it shouldBe generatedText.size }

        }
    }

    @Test
    fun `søk med tekst-term skal returnere riktig søkeresultat`() {
        val text = "dagpenger"

        repository.save(additionalTestData(title = text))
        val response = get<SearchResult>(searchUri(ord = text))

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
        val response = get<SearchResult>(searchUri(ord = fuzzyText))

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
            ),
        )

        val response = get<SearchResult>(searchUri(ord = "\"$frase\""))

        response.statusCode shouldBe HttpStatus.OK
        assertSoftly(response.body!!) {
            total shouldBe 1L
            hits.first().displayName shouldContain frase
        }
    }

    @Test
    fun `søk med underfasett skal returnere riktig søkeresultat`() {
        val response =
            get<SearchResult>(
                searchUri(ord = "", f = FacetKeys.PRIVATPERSON, uf = listOf(UnderFacetKeys.INFORMASJON)),
            )

        response.statusCode shouldBe HttpStatus.OK
        assertSoftly(response.body!!) {
            total shouldBe generatedText.size
        }
    }
}
