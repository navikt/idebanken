package no.nav.navnosearchapi.search.mapper

import no.nav.navnosearchadminapi.common.enums.ValidAudiences
import no.nav.navnosearchadminapi.common.enums.ValidMetatags
import no.nav.navnosearchadminapi.common.model.Content
import no.nav.navnosearchapi.search.controller.Params
import no.nav.navnosearchapi.search.dto.Aggregations
import no.nav.navnosearchapi.search.dto.FacetBucket
import no.nav.navnosearchapi.search.dto.SearchHit
import no.nav.navnosearchapi.search.dto.SearchResult
import no.nav.navnosearchapi.search.dto.UnderAggregations
import no.nav.navnosearchapi.search.filters.facets.facetFilters
import no.nav.navnosearchapi.search.utils.isInQuotes
import org.opensearch.data.client.orhlc.OpenSearchAggregations
import org.opensearch.search.aggregations.bucket.filter.Filter
import org.springframework.data.elasticsearch.core.AggregationsContainer
import org.springframework.data.elasticsearch.core.SearchPage
import java.time.ZonedDateTime

private val providerSubaudiences = listOf(
    ValidAudiences.PROVIDER_DOCTOR.descriptor,
    ValidAudiences.PROVIDER_MUNICIPALITY_EMPLOYED.descriptor,
    ValidAudiences.PROVIDER_OPTICIAN.descriptor,
    ValidAudiences.PROVIDER_ADMINISTRATOR.descriptor,
    ValidAudiences.PROVIDER_MEASURES_ORGANIZER.descriptor,
    ValidAudiences.PROVIDER_AID_SUPPLIER.descriptor,
    ValidAudiences.PROVIDER_OTHER.descriptor,
)

private val metatagsWithModifiedTime = setOf(
    ValidMetatags.PRESSEMELDING.descriptor,
    ValidMetatags.PRESSE.descriptor,
    ValidMetatags.ANALYSE.descriptor,
    ValidMetatags.STATISTIKK.descriptor,
)

fun SearchPage<Content>.toSearchResult(params: Params) = SearchResult(
    page = params.page,
    s = params.s,
    preferredLanguage = params.preferredLanguage,
    isMore = !isLast,
    word = params.ord,
    total = totalElements,
    fasettKey = params.f,
    aggregations = searchHits.aggregations?.asMap()?.toAggregations(params),
    hits = searchHits.searchHits.map { searchHit ->
        searchHit.content.toHit(
            searchHit.toHighlight(params.ord.isInQuotes()),
            searchHit.score
        )
    },
)

private fun <T> AggregationsContainer<T>.asMap(): Map<String, Long> {
    return (this as OpenSearchAggregations).aggregations().associate { it.name to (it as Filter).docCount }
}

private fun Content.toHit(highlight: String, score: Float): SearchHit {
    val (publishedTime, modifiedTime) = resolveTimestamps(createdAt, lastUpdated, metatags, fylke)
    return SearchHit(
        displayName = title.value,
        href = href,
        highlight = highlight,
        modifiedTime = modifiedTime,
        publishedTime = publishedTime,
        audience = toAudience(audience),
        language = language,
        type = type,
        score = score,
    )
}

private fun toAudience(audience: List<String>): List<String> {
    // Filtrer ut overordnet Provider-audience hvis den inneholder mer presist audience
    return if (audience.any { it in providerSubaudiences }) {
        audience.filter { it != ValidAudiences.PROVIDER.descriptor }
    } else {
        audience
    }
}

private fun resolveTimestamps(
    createdAt: ZonedDateTime,
    lastUpdated: ZonedDateTime,
    metatags: List<String>,
    fylke: String?
): Pair<ZonedDateTime?, ZonedDateTime?> {
    val showBothTimestamps = ValidMetatags.NYHET.descriptor in metatags
    val showNoTimestamps = fylke.isNullOrBlank() && metatags.none { it in metatagsWithModifiedTime }

    return when {
        showBothTimestamps -> Pair(createdAt, lastUpdated.takeIf { createdAt != lastUpdated })
        showNoTimestamps -> Pair(null, null)
        else -> Pair(null, lastUpdated)
    }
}

private fun Map<String, Long>.toAggregations(params: Params) = Aggregations(
    fasetter = UnderAggregations(
        buckets = facetFilters.map { facet ->
            FacetBucket(
                key = facet.key,
                name = facet.name,
                docCount = this[facet.name] ?: 0,
                checked = facet.key == params.f,
                underaggregeringer = facet.underFacets.map { underFacet ->
                    FacetBucket(
                        key = underFacet.key,
                        name = underFacet.name,
                        docCount = this[underFacet.aggregationName] ?: 0,
                        checked = underFacet.key in params.uf,
                    )
                }.filterNotEmpty().let { UnderAggregations(it) }
            )
        }
    )
)

private fun List<FacetBucket>.filterNotEmpty(): List<FacetBucket> {
    return filter { b -> b.docCount > 0 }
}