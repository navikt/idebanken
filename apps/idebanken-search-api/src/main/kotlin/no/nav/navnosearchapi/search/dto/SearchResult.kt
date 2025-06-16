package no.nav.navnosearchapi.search.dto

import java.time.ZonedDateTime

data class SearchResult(
    val page: Int,
    val s: Int,
    val preferredLanguage: String?,
    val isMore: Boolean,
    val word: String,
    val total: Long,
    val fasettKey: String,
    val aggregations: Aggregations?,
    val hits: List<SearchHit>
)

data class SearchHit(
    val displayName: String,
    val href: String,
    val highlight: String,
    val modifiedTime: ZonedDateTime?,
    val publishedTime: ZonedDateTime?,
    val audience: List<String>,
    val language: String,
    val type: String,
    val score: Float,
)

data class Aggregations(
    val fasetter: UnderAggregations,
)

data class UnderAggregations(
    val buckets: List<FacetBucket> = emptyList(),
)

data class FacetBucket(
    val key: String,
    val docCount: Long,
    val checked: Boolean,
    val name: String,
    val underaggregeringer: UnderAggregations? = null
)