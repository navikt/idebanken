package no.nav.navnosearchapi.search.filters.underfacets

import no.nav.navnosearchadminapi.common.enums.ValidMetatags
import no.nav.navnosearchapi.search.filters.AggregationNames
import no.nav.navnosearchapi.search.filters.Filter
import no.nav.navnosearchapi.search.filters.UnderFacetKeys
import no.nav.navnosearchapi.search.filters.UnderFacetNames
import no.nav.navnosearchapi.search.filters.mustHaveMetatags
import no.nav.navnosearchapi.search.filters.mustHaveOneOfMetatags
import no.nav.navnosearchapi.search.filters.mustNotHaveMetatags
import org.opensearch.index.query.BoolQueryBuilder

val analyseFilters = listOf(
    Filter(
        key = UnderFacetKeys.ARTIKLER,
        name = UnderFacetNames.ARTIKLER,
        aggregationName = AggregationNames.ANALYSER_OG_FORSKNING_ARTIKLER,
        filterQuery = baseQuery().mustNotHaveMetatags(ValidMetatags.NYHET, ValidMetatags.PRESSEMELDING)
    ),
    Filter(
        key = UnderFacetKeys.NYHETER,
        name = UnderFacetNames.NYHETER,
        aggregationName = AggregationNames.ANALYSER_OG_FORSKNING_NYHETER,
        filterQuery = baseQuery().mustHaveOneOfMetatags(ValidMetatags.NYHET, ValidMetatags.PRESSEMELDING)
    ),
)

private fun baseQuery() = BoolQueryBuilder().mustHaveMetatags(ValidMetatags.ANALYSE)