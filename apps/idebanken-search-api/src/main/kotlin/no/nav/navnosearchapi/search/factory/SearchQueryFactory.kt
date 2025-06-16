package no.nav.navnosearchapi.search.factory

import no.nav.navnosearchadminapi.common.constants.METATAGS
import no.nav.navnosearchadminapi.common.constants.SORT_BY_DATE
import no.nav.navnosearchadminapi.common.constants.TYPE
import no.nav.navnosearchapi.common.config.SearchConfig
import no.nav.navnosearchapi.common.utils.applyFilters
import no.nav.navnosearchapi.common.utils.applyWeighting
import no.nav.navnosearchapi.search.controller.Params
import no.nav.navnosearchapi.search.factory.queries.highlightBuilder
import no.nav.navnosearchapi.search.factory.queries.searchAllTextForPhraseQuery
import no.nav.navnosearchapi.search.factory.queries.searchAllTextQuery
import no.nav.navnosearchapi.search.filters.Filter
import no.nav.navnosearchapi.search.filters.facets.facetFilters
import no.nav.navnosearchapi.search.filters.joinToSingleQuery
import no.nav.navnosearchapi.search.filters.preferredLanguageFilterQuery
import no.nav.navnosearchapi.search.utils.isInQuotes
import org.opensearch.data.client.orhlc.NativeSearchQueryBuilder
import org.opensearch.index.query.BoolQueryBuilder
import org.opensearch.index.query.MatchAllQueryBuilder
import org.opensearch.index.query.QueryBuilder
import org.opensearch.index.query.functionscore.FunctionScoreQueryBuilder
import org.opensearch.search.aggregations.AggregationBuilders
import org.opensearch.search.aggregations.bucket.filter.FilterAggregationBuilder
import org.springframework.data.domain.Sort

object SearchQueryFactory {
    private val skjemanummerRegex = Regex("""(?:NAV|nav)?.?([0-9]{2}).?([0-9]{2}).?([0-9]{2})""")

    fun createBuilder(
        params: Params,
        includeAggregations: Boolean = false,
    ): NativeSearchQueryBuilder {
        val baseQuery = baseQuery(params.ord)
        return NativeSearchQueryBuilder()
            .withQuery(baseQuery.withFiltersAndWeights(params))
            .withFilter(postAggregationFilters(params.f, params.uf))
            .withHighlightBuilder(highlightBuilder(baseQuery, params.ord.isInQuotes()))
            .withTrackTotalHits(true)
            .apply {
                if (includeAggregations) withAggregations(aggregations())
                if (params.s == 1) withSort(Sort.by(Sort.Direction.DESC, SORT_BY_DATE))
            }
    }

    private fun baseQuery(term: String): QueryBuilder {
        return resolveTerm(term).let { (resolvedTerm, skjemanummer) ->
            when {
                term.isBlank() -> MatchAllQueryBuilder()
                term.isInQuotes() -> searchAllTextForPhraseQuery(term)
                resolvedTerm.isBlank() && skjemanummer != null -> searchAllTextForPhraseQuery(skjemanummer)
                else -> searchAllTextQuery(resolvedTerm, skjemanummer)
            }
        }
    }

    private fun aggregations(): List<FilterAggregationBuilder> {
        val allFacetsAndUnderfacets = facetFilters + facetFilters.flatMap(Filter::underFacets)
        return allFacetsAndUnderfacets.map { AggregationBuilders.filter(it.aggregationName, it.filterQuery) }
    }

    private fun QueryBuilder.withFiltersAndWeights(params: Params): FunctionScoreQueryBuilder {
        return this.applyFilters(preAggregationFilters(params.preferredLanguage))
            .applyWeighting(TYPE, SearchConfig.typeToWeight)
            .applyWeighting(METATAGS, SearchConfig.metatagToWeight)
    }

    private fun preAggregationFilters(preferredLanguage: String?) = BoolQueryBuilder().apply {
        if (preferredLanguage != null) {
            this.must(preferredLanguageFilterQuery(preferredLanguage))
        }
    }

    private fun postAggregationFilters(f: String, uf: List<String>): BoolQueryBuilder? {
        return BoolQueryBuilder().must(activeFacetFilterQuery(f, uf))
    }

    private fun activeFacetFilterQuery(f: String, uf: List<String>): BoolQueryBuilder {
        val facet: Filter = requireNotNull(facetFilters.find { it.key == f }) { "Fant ikke fasett med key $f" }
        return when {
            uf.isEmpty() -> facet.filterQuery
            else -> facet.underFacets
                .filter { it.key in uf }
                .map(Filter::filterQuery)
                .joinToSingleQuery(BoolQueryBuilder::should)
        }
    }

    private fun resolveTerm(term: String): Pair<String, String?> {
        return term.overrideTermIfApplicable().extractSkjemanummerIfPresent()
    }

    private fun String.overrideTermIfApplicable(): String {
        return SearchConfig.termsToOverride[this.trim()] ?: this
    }

    private fun String.extractSkjemanummerIfPresent(): Pair<String, String?> {
        return skjemanummerRegex.find(this)?.let { matchResult ->
            val termWithoutSkjemanummer = replace(matchResult.value, "")
            val skjemanummerFormatted = with(matchResult.groupValues) { "NAV ${get(1)}-${get(2)}.${get(3)}" }
            termWithoutSkjemanummer to skjemanummerFormatted
        } ?: (this to null)
    }
}