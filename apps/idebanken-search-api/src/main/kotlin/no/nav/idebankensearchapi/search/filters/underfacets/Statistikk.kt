package no.nav.idebankensearchapi.search.filters.underfacets

import no.nav.idebankensearchapi.search.filters.AggregationNames
import no.nav.idebankensearchapi.search.filters.Filter
import no.nav.idebankensearchapi.search.filters.UnderFacetKeys
import no.nav.idebankensearchapi.search.filters.UnderFacetNames
import no.nav.idebankensearchapi.search.filters.mustHaveMetatags
import no.nav.idebankensearchapi.search.filters.mustHaveOneOfMetatags
import no.nav.idebankensearchapi.search.filters.mustHaveTypes
import no.nav.idebankensearchapi.search.filters.mustNotHaveMetatags
import no.nav.idebankensearchapi.search.filters.mustNotHaveTypes
import no.nav.navnosearchadminapi.common.enums.ValidMetatags
import no.nav.navnosearchadminapi.common.enums.ValidTypes
import org.opensearch.index.query.BoolQueryBuilder

val statistikkFilters =
    listOf(
        Filter(
            key = UnderFacetKeys.ARTIKLER,
            name = UnderFacetNames.ARTIKLER,
            aggregationName = AggregationNames.STATISTIKK_ARTIKLER,
            filterQuery =
                baseQuery()
                    .mustNotHaveTypes(ValidTypes.TABELL)
                    .mustNotHaveMetatags(ValidMetatags.NYHET, ValidMetatags.PRESSEMELDING),
        ),
        Filter(
            key = UnderFacetKeys.NYHETER,
            name = UnderFacetNames.NYHETER,
            aggregationName = AggregationNames.STATISTIKK_NYHETER,
            filterQuery = baseQuery().mustHaveOneOfMetatags(ValidMetatags.NYHET, ValidMetatags.PRESSEMELDING),
        ),
        Filter(
            key = UnderFacetKeys.TABELLER,
            name = UnderFacetNames.TABELLER,
            aggregationName = AggregationNames.STATISTIKK_TABELLER,
            filterQuery = baseQuery().mustHaveTypes(ValidTypes.TABELL),
        ),
    )

private fun baseQuery() = BoolQueryBuilder().mustHaveMetatags(ValidMetatags.STATISTIKK)
