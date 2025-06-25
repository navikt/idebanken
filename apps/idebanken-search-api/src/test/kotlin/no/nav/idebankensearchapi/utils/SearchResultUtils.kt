package no.nav.idebankensearchapi.utils

import no.nav.idebankensearchapi.search.dto.SearchResult

fun SearchResult.aggregationCount(
    facet: String,
    underFacet: String? = null,
): Long? =
    aggregations?.fasetter?.buckets?.find { it.key == facet }.let { facetBucket ->
        when (underFacet) {
            null -> facetBucket?.docCount
            else ->
                facetBucket
                    ?.underaggregeringer
                    ?.buckets
                    ?.find { it.key == underFacet }
                    ?.docCount
        }
    }

fun SearchResult.allUnderaggregationCounts(facet: String): List<Long> =
    aggregations
        ?.fasetter
        ?.buckets
        ?.find {
            it.key == facet
        }?.underaggregeringer
        ?.buckets
        ?.map(no.nav.idebankensearchapi.search.dto.FacetBucket::docCount)!!
