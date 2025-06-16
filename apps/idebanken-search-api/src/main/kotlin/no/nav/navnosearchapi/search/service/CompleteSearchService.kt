package no.nav.navnosearchapi.search.service

import no.nav.navnosearchapi.common.client.SearchClient
import no.nav.navnosearchapi.search.controller.Params
import no.nav.navnosearchapi.search.dto.SearchResult
import no.nav.navnosearchapi.search.factory.SearchQueryFactory
import no.nav.navnosearchapi.search.mapper.toSearchResult
import org.springframework.beans.factory.annotation.Value
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service

@Service
class CompleteSearchService(
    @Value("\${opensearch.page-size}") val pageSize: Int,
    val searchClient: SearchClient,
) {
    fun search(params: Params): SearchResult {
        val result = searchClient.searchForPage(
            query = SearchQueryFactory.createBuilder(params = params, includeAggregations = true),
            pageRequest = PageRequest.of(params.page, pageSize)
        )
        return result.toSearchResult(params)
    }
}