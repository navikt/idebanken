package no.nav.idebankensearchapi.search.service

import no.nav.idebankensearchapi.common.client.SearchClient
import no.nav.idebankensearchapi.search.controller.Params
import no.nav.idebankensearchapi.search.dto.DecoratorSearchResult
import no.nav.idebankensearchapi.search.factory.SearchQueryFactory
import no.nav.idebankensearchapi.search.mapper.toDecoratorSearchResult
import org.springframework.beans.factory.annotation.Value
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service

@Service
class DecoratorSearchService(
    @Value("\${opensearch.decorator-page-size}") val pageSize: Int,
    val searchClient: SearchClient,
) {
    fun search(params: Params): DecoratorSearchResult {
        val result =
            searchClient.searchForPage(
                query = SearchQueryFactory.createBuilder(params),
                pageRequest = PageRequest.of(FIRST_PAGE, pageSize),
            )
        return result.toDecoratorSearchResult(params)
    }

    companion object {
        private const val FIRST_PAGE = 0
    }
}
