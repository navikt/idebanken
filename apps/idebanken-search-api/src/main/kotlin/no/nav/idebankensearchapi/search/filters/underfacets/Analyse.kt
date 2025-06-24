package no.nav.idebankensearchapi.search.filters.underfacets

import no.nav.idebankensearchapi.search.filters.AggregationNames
import no.nav.idebankensearchapi.search.filters.Filter
import no.nav.idebankensearchapi.search.filters.UnderFacetKeys
import no.nav.idebankensearchapi.search.filters.UnderFacetNames
import no.nav.idebankensearchapi.search.filters.mustHaveMetatags
import no.nav.idebankensearchapi.search.filters.mustHaveOneOfMetatags
import no.nav.idebankensearchapi.search.filters.mustNotHaveMetatags
import no.nav.navnosearchadminapi.common.enums.ValidMetatags
import org.opensearch.index.query.BoolQueryBuilder

val analyseFilters =
    listOf(
        Filter(
            key = UnderFacetKeys.ARTIKLER,
            name = UnderFacetNames.ARTIKLER,
            aggregationName = AggregationNames.ANALYSER_OG_FORSKNING_ARTIKLER,
            filterQuery = baseQuery().mustNotHaveMetatags(ValidMetatags.NYHET, ValidMetatags.PRESSEMELDING),
        ),
        Filter(
            key = UnderFacetKeys.NYHETER,
            name = UnderFacetNames.NYHETER,
            aggregationName = AggregationNames.ANALYSER_OG_FORSKNING_NYHETER,
            filterQuery = baseQuery().mustHaveOneOfMetatags(ValidMetatags.NYHET, ValidMetatags.PRESSEMELDING),
        ),
    )

private fun baseQuery() = BoolQueryBuilder().mustHaveMetatags(ValidMetatags.ANALYSE)
