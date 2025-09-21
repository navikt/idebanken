package no.nav.idebankensearchapi.common.client

import no.nav.idebankensearchapi.common.model.IBContent
import org.opensearch.data.client.orhlc.NativeSearchQueryBuilder
import org.springframework.data.domain.PageRequest
import org.springframework.data.elasticsearch.core.ElasticsearchOperations
import org.springframework.data.elasticsearch.core.SearchHitSupport
import org.springframework.data.elasticsearch.core.SearchPage
import org.springframework.stereotype.Component

@Component
class SearchClient(
    val operations: ElasticsearchOperations,
) {
    fun search(query: NativeSearchQueryBuilder) = operations.search(query.build(), IBContent::class.java)

    fun searchForPage(
        query: NativeSearchQueryBuilder,
        pageRequest: PageRequest,
    ): SearchPage<IBContent> {
        val result = search(query.withPageable(pageRequest))
        return SearchHitSupport.searchPageFor(result, pageRequest)
    }
}
