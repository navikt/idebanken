package no.nav.navnosearchapi.search.filters.underfacets

import no.nav.navnosearchadminapi.common.enums.ValidMetatags
import no.nav.navnosearchadminapi.common.enums.ValidTypes
import no.nav.navnosearchapi.search.filters.AggregationNames
import no.nav.navnosearchapi.search.filters.Filter
import no.nav.navnosearchapi.search.filters.UnderFacetKeys
import no.nav.navnosearchapi.search.filters.UnderFacetNames
import no.nav.navnosearchapi.search.filters.mustHaveMetatags
import no.nav.navnosearchapi.search.filters.mustHaveOneOfMetatags
import no.nav.navnosearchapi.search.filters.mustHaveTypes
import no.nav.navnosearchapi.search.filters.mustNotHaveMetatags
import no.nav.navnosearchapi.search.filters.mustNotHaveTypes
import org.opensearch.index.query.BoolQueryBuilder

val statistikkFilters = listOf(
    Filter(
        key = UnderFacetKeys.ARTIKLER,
        name = UnderFacetNames.ARTIKLER,
        aggregationName = AggregationNames.STATISTIKK_ARTIKLER,
        filterQuery = baseQuery().mustNotHaveTypes(ValidTypes.TABELL)
            .mustNotHaveMetatags(ValidMetatags.NYHET, ValidMetatags.PRESSEMELDING)
    ),
    Filter(
        key = UnderFacetKeys.NYHETER,
        name = UnderFacetNames.NYHETER,
        aggregationName = AggregationNames.STATISTIKK_NYHETER,
        filterQuery = baseQuery().mustHaveOneOfMetatags(ValidMetatags.NYHET, ValidMetatags.PRESSEMELDING)
    ),
    Filter(
        key = UnderFacetKeys.TABELLER,
        name = UnderFacetNames.TABELLER,
        aggregationName = AggregationNames.STATISTIKK_TABELLER,
        filterQuery = baseQuery().mustHaveTypes(ValidTypes.TABELL)
    ),
)

private fun baseQuery() = BoolQueryBuilder().mustHaveMetatags(ValidMetatags.STATISTIKK)