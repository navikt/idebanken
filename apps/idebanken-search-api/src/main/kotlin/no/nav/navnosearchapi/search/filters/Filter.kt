package no.nav.navnosearchapi.search.filters

import org.opensearch.index.query.BoolQueryBuilder

data class Filter(
    val key: String,
    val name: String,
    val aggregationName: String = name,
    val filterQuery: BoolQueryBuilder,
    val underFacets: List<Filter> = emptyList()
)