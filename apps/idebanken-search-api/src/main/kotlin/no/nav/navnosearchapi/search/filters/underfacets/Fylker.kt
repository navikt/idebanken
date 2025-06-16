package no.nav.navnosearchapi.search.filters.underfacets

import no.nav.navnosearchadminapi.common.enums.ValidFylker
import no.nav.navnosearchapi.search.filters.Filter
import no.nav.navnosearchapi.search.filters.UnderFacetKeys
import no.nav.navnosearchapi.search.filters.UnderFacetNames
import no.nav.navnosearchapi.search.filters.mustHaveFylker
import org.opensearch.index.query.BoolQueryBuilder

val fylkeFilters = listOf(
    Filter(
        key = UnderFacetKeys.AGDER,
        name = UnderFacetNames.AGDER,
        filterQuery = BoolQueryBuilder().mustHaveFylker(ValidFylker.AGDER)
    ),
    Filter(
        key = UnderFacetKeys.INNLANDET,
        name = UnderFacetNames.INNLANDET,
        filterQuery = BoolQueryBuilder().mustHaveFylker(ValidFylker.INNLANDET)
    ),
    Filter(
        key = UnderFacetKeys.MORE_OG_ROMSDAL,
        name = UnderFacetNames.MORE_OG_ROMSDAL,
        filterQuery = BoolQueryBuilder().mustHaveFylker(ValidFylker.MORE_OG_ROMSDAL)
    ),
    Filter(
        key = UnderFacetKeys.NORDLAND,
        name = UnderFacetNames.NORDLAND,
        filterQuery = BoolQueryBuilder().mustHaveFylker(ValidFylker.NORDLAND)
    ),
    Filter(
        key = UnderFacetKeys.OSLO,
        name = UnderFacetNames.OSLO,
        filterQuery = BoolQueryBuilder().mustHaveFylker(ValidFylker.OSLO)
    ),
    Filter(
        key = UnderFacetKeys.ROGALAND,
        name = UnderFacetNames.ROGALAND,
        filterQuery = BoolQueryBuilder().mustHaveFylker(ValidFylker.ROGALAND)
    ),
    Filter(
        key = UnderFacetKeys.TROMS_OG_FINNMARK,
        name = UnderFacetNames.TROMS_OG_FINNMARK,
        filterQuery = BoolQueryBuilder().mustHaveFylker(ValidFylker.TROMS_OG_FINNMARK)
    ),
    Filter(
        key = UnderFacetKeys.TRONDELAG,
        name = UnderFacetNames.TRONDELAG,
        filterQuery = BoolQueryBuilder().mustHaveFylker(ValidFylker.TRONDELAG)
    ),
    Filter(
        key = UnderFacetKeys.VESTFOLD_OG_TELEMARK,
        name = UnderFacetNames.VESTFOLD_OG_TELEMARK,
        filterQuery = BoolQueryBuilder().mustHaveFylker(ValidFylker.VESTFOLD_OG_TELEMARK)
    ),
    Filter(
        key = UnderFacetKeys.VESTLAND,
        name = UnderFacetNames.VESTLAND,
        filterQuery = BoolQueryBuilder().mustHaveFylker(ValidFylker.VESTLAND)
    ),
    Filter(
        key = UnderFacetKeys.VEST_VIKEN,
        name = UnderFacetNames.VEST_VIKEN,
        filterQuery = BoolQueryBuilder().mustHaveFylker(ValidFylker.VEST_VIKEN)
    ),
    Filter(
        key = UnderFacetKeys.OST_VIKEN,
        name = UnderFacetNames.OST_VIKEN,
        filterQuery = BoolQueryBuilder().mustHaveFylker(ValidFylker.OST_VIKEN)
    ),
)