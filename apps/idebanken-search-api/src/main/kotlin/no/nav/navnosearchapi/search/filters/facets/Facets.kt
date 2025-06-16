package no.nav.navnosearchapi.search.filters.facets

import no.nav.navnosearchadminapi.common.constants.FYLKE
import no.nav.navnosearchadminapi.common.enums.ValidMetatags
import no.nav.navnosearchapi.search.filters.FacetKeys
import no.nav.navnosearchapi.search.filters.FacetNames
import no.nav.navnosearchapi.search.filters.Filter
import no.nav.navnosearchapi.search.filters.joinToSingleQuery
import no.nav.navnosearchapi.search.filters.mustHaveField
import no.nav.navnosearchapi.search.filters.mustHaveMetatags
import no.nav.navnosearchapi.search.filters.mustHaveOneOfMetatags
import no.nav.navnosearchapi.search.filters.mustNotHaveField
import no.nav.navnosearchapi.search.filters.underfacets.analyseFilters
import no.nav.navnosearchapi.search.filters.underfacets.arbeidsgiverFilters
import no.nav.navnosearchapi.search.filters.underfacets.fylkeFilters
import no.nav.navnosearchapi.search.filters.underfacets.privatpersonFilters
import no.nav.navnosearchapi.search.filters.underfacets.samarbeidspartnerFilters
import no.nav.navnosearchapi.search.filters.underfacets.statistikkFilters
import org.opensearch.index.query.BoolQueryBuilder

val facetFilters = listOf(
    Filter(
        key = FacetKeys.PRIVATPERSON,
        name = FacetNames.PRIVATPERSON,
        filterQuery = privatpersonFilters.map(Filter::filterQuery)
            .joinToSingleQuery(BoolQueryBuilder::should),
        underFacets = privatpersonFilters
    ),
    Filter(
        key = FacetKeys.ARBEIDSGIVER,
        name = FacetNames.ARBEIDSGIVER,
        filterQuery = arbeidsgiverFilters.map(Filter::filterQuery)
            .joinToSingleQuery(BoolQueryBuilder::should),
        underFacets = arbeidsgiverFilters
    ),
    Filter(
        key = FacetKeys.SAMARBEIDSPARTNER,
        name = FacetNames.SAMARBEIDSPARTNER,
        filterQuery = samarbeidspartnerFilters.map(Filter::filterQuery)
            .joinToSingleQuery(BoolQueryBuilder::should),
        underFacets = samarbeidspartnerFilters
    ),
    Filter(
        key = FacetKeys.PRESSE,
        name = FacetNames.PRESSE,
        filterQuery = BoolQueryBuilder()
            .mustHaveOneOfMetatags(ValidMetatags.PRESSE, ValidMetatags.PRESSEMELDING)
            .mustNotHaveField(FYLKE),
    ),
    Filter(
        key = FacetKeys.STATISTIKK,
        name = FacetNames.STATISTIKK,
        filterQuery = BoolQueryBuilder().mustHaveMetatags(ValidMetatags.STATISTIKK),
        underFacets = statistikkFilters
    ),
    Filter(
        key = FacetKeys.ANALYSER_OG_FORSKNING,
        name = FacetNames.ANALYSER_OG_FORSKNING,
        filterQuery = BoolQueryBuilder().mustHaveMetatags(ValidMetatags.ANALYSE),
        underFacets = analyseFilters
    ),
    Filter(
        key = FacetKeys.INNHOLD_FRA_FYLKER,
        name = FacetNames.INNHOLD_FRA_FYLKER,
        filterQuery = BoolQueryBuilder().mustHaveField(FYLKE),
        underFacets = fylkeFilters
    ),
)