package no.nav.idebankensearchapi.search.filters.facets

import no.nav.idebankensearchapi.search.filters.FacetKeys
import no.nav.idebankensearchapi.search.filters.FacetNames
import no.nav.idebankensearchapi.search.filters.Filter
import no.nav.idebankensearchapi.search.filters.joinToSingleQuery
import no.nav.idebankensearchapi.search.filters.mustHaveField
import no.nav.idebankensearchapi.search.filters.mustHaveMetatags
import no.nav.idebankensearchapi.search.filters.mustHaveOneOfMetatags
import no.nav.idebankensearchapi.search.filters.mustNotHaveField
import no.nav.idebankensearchapi.search.filters.underfacets.analyseFilters
import no.nav.idebankensearchapi.search.filters.underfacets.arbeidsgiverFilters
import no.nav.idebankensearchapi.search.filters.underfacets.fylkeFilters
import no.nav.idebankensearchapi.search.filters.underfacets.privatpersonFilters
import no.nav.idebankensearchapi.search.filters.underfacets.samarbeidspartnerFilters
import no.nav.idebankensearchapi.search.filters.underfacets.statistikkFilters
import no.nav.navnosearchadminapi.common.constants.FYLKE
import no.nav.navnosearchadminapi.common.enums.ValidMetatags
import org.opensearch.index.query.BoolQueryBuilder

val facetFilters =
    listOf(
        Filter(
            key = FacetKeys.PRIVATPERSON,
            name = FacetNames.PRIVATPERSON,
            filterQuery =
                privatpersonFilters
                    .map(Filter::filterQuery)
                    .joinToSingleQuery(BoolQueryBuilder::should),
            underFacets = privatpersonFilters,
        ),
        Filter(
            key = FacetKeys.ARBEIDSGIVER,
            name = FacetNames.ARBEIDSGIVER,
            filterQuery =
                arbeidsgiverFilters
                    .map(Filter::filterQuery)
                    .joinToSingleQuery(BoolQueryBuilder::should),
            underFacets = arbeidsgiverFilters,
        ),
        Filter(
            key = FacetKeys.SAMARBEIDSPARTNER,
            name = FacetNames.SAMARBEIDSPARTNER,
            filterQuery =
                samarbeidspartnerFilters
                    .map(Filter::filterQuery)
                    .joinToSingleQuery(BoolQueryBuilder::should),
            underFacets = samarbeidspartnerFilters,
        ),
        Filter(
            key = FacetKeys.PRESSE,
            name = FacetNames.PRESSE,
            filterQuery =
                BoolQueryBuilder()
                    .mustHaveOneOfMetatags(ValidMetatags.PRESSE, ValidMetatags.PRESSEMELDING)
                    .mustNotHaveField(FYLKE),
        ),
        Filter(
            key = FacetKeys.STATISTIKK,
            name = FacetNames.STATISTIKK,
            filterQuery = BoolQueryBuilder().mustHaveMetatags(ValidMetatags.STATISTIKK),
            underFacets = statistikkFilters,
        ),
        Filter(
            key = FacetKeys.ANALYSER_OG_FORSKNING,
            name = FacetNames.ANALYSER_OG_FORSKNING,
            filterQuery = BoolQueryBuilder().mustHaveMetatags(ValidMetatags.ANALYSE),
            underFacets = analyseFilters,
        ),
        Filter(
            key = FacetKeys.INNHOLD_FRA_FYLKER,
            name = FacetNames.INNHOLD_FRA_FYLKER,
            filterQuery = BoolQueryBuilder().mustHaveField(FYLKE),
            underFacets = fylkeFilters,
        ),
    )
