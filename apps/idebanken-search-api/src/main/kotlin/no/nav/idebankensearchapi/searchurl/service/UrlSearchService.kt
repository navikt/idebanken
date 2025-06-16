package no.nav.idebankensearchapi.searchurl.service

import no.nav.idebankensearchapi.common.client.SearchClient
import no.nav.idebankensearchapi.searchurl.dto.SearchUrlResponse
import no.nav.idebankensearchapi.searchurl.factory.UrlSearchQueryFactory
import org.springframework.stereotype.Service

@Service
class UrlSearchService(
    val searchClient: SearchClient,
) {
    fun search(term: String): SearchUrlResponse {
        val query = UrlSearchQueryFactory.createBuilder(term)
        val result = searchClient.search(query)
        return result.searchHits.firstOrNull()?.content.let {
            SearchUrlResponse(
                it?.href,
                it?.title?.value,
            )
        }
    }
}
