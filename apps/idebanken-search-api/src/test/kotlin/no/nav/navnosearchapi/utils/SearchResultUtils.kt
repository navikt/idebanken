package no.nav.navnosearchapi.utils

import no.nav.navnosearchapi.search.dto.SearchResult

fun SearchResult.aggregationCount(facet: String, underFacet: String? = null): Long? {
    return aggregations?.fasetter?.buckets?.find { it.key == facet }.let { facetBucket ->
        when (underFacet) {
            null -> facetBucket?.docCount
            else -> facetBucket?.underaggregeringer?.buckets?.find { it.key == underFacet }?.docCount
        }
    }
}

fun SearchResult.allUnderaggregationCounts(facet: String): List<Long> {
    return aggregations?.fasetter?.buckets?.find { it.key == facet }?.underaggregeringer?.buckets?.map(no.nav.navnosearchapi.search.dto.FacetBucket::docCount)!!
}