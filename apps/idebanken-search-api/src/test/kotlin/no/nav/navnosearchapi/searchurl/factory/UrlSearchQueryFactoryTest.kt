package no.nav.navnosearchapi.searchurl.factory

import io.kotest.assertions.json.shouldEqualJson
import no.nav.navnosearchapi.utils.readJsonFile
import org.junit.jupiter.api.Test

class UrlSearchQueryFactoryTest {
    @Test
    fun `standard søk skal bruke forventet query`() {
        val query = UrlSearchQueryFactory.createBuilder("https://dummy.url").build()

        query.query.toString() shouldEqualJson readJsonFile("/search-url-queries/standard-query.json")
    }
}