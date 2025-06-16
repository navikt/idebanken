package no.nav.navnosearchapi.search.factory

import io.kotest.assertions.json.shouldEqualJson
import io.kotest.matchers.nulls.shouldBeNull
import no.nav.navnosearchapi.search.controller.Params
import no.nav.navnosearchapi.utils.readJsonFile
import org.junit.jupiter.api.Test

class SearchQueryFactoryTest {
    @Test
    fun `standard søk skal bruke forventet query`() {
        val query = SearchQueryFactory.createBuilder(Params(ord = "søketerm")).build()

        query.query.toString() shouldEqualJson readJsonFile("/search-queries/standard-query.json")
        query.filter.toString() shouldEqualJson readJsonFile("/search-queries/standard-filter.json")
        query.aggregations.shouldBeNull()
        query.highlightBuilder.toString() shouldEqualJson readJsonFile("/search-queries/standard-highlight-builder.json")
    }

    @Test
    fun `frasesøk skal bruke forventet query`() {
        val query = SearchQueryFactory.createBuilder(Params(ord = "\"dette er en frase\"")).build()

        query.query.toString() shouldEqualJson readJsonFile("/search-queries/phrase-query.json")
        query.filter.toString() shouldEqualJson readJsonFile("/search-queries/standard-filter.json")
        query.aggregations.shouldBeNull()
        query.highlightBuilder.toString() shouldEqualJson readJsonFile("/search-queries/phrase-highlight-builder.json")
    }

    @Test
    fun `søk med skjemanummer skal bruke forventet query`() {
        val query = SearchQueryFactory.createBuilder(Params(ord = "her er et skjemanummer: NAV 09-35.01")).build()

        query.query.toString() shouldEqualJson readJsonFile("/search-queries/skjemanummer-query.json")
        query.filter.toString() shouldEqualJson readJsonFile("/search-queries/standard-filter.json")
        query.aggregations.shouldBeNull()
        query.highlightBuilder.toString() shouldEqualJson readJsonFile("/search-queries/skjemanummer-highlight-builder.json")
    }

    @Test
    fun `standard søk uten aggregeringer skal bruke forventet query`() {
        val query = SearchQueryFactory.createBuilder(
            Params(ord = "søketerm"),
            includeAggregations = true
        ).build()

        query.query.toString() shouldEqualJson readJsonFile("/search-queries/standard-query.json")
        query.filter.toString() shouldEqualJson readJsonFile("/search-queries/standard-filter.json")
        query.aggregations.toString() shouldEqualJson readJsonFile("/search-queries/standard-aggregations.json")
        query.highlightBuilder.toString() shouldEqualJson readJsonFile("/search-queries/standard-highlight-builder.json")
    }
}