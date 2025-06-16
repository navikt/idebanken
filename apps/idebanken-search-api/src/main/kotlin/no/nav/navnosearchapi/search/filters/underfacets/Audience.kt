package no.nav.navnosearchapi.search.filters.underfacets

import no.nav.navnosearchadminapi.common.constants.FYLKE
import no.nav.navnosearchadminapi.common.enums.ValidAudiences
import no.nav.navnosearchadminapi.common.enums.ValidMetatags
import no.nav.navnosearchadminapi.common.enums.ValidTypes
import no.nav.navnosearchapi.search.filters.AggregationNames
import no.nav.navnosearchapi.search.filters.Filter
import no.nav.navnosearchapi.search.filters.UnderFacetKeys
import no.nav.navnosearchapi.search.filters.UnderFacetNames
import no.nav.navnosearchapi.search.filters.mustHaveAudience
import no.nav.navnosearchapi.search.filters.mustHaveMetatags
import no.nav.navnosearchapi.search.filters.mustHaveOneOfTypes
import no.nav.navnosearchapi.search.filters.mustNotHaveField
import no.nav.navnosearchapi.search.filters.mustNotHaveMetatags
import org.opensearch.index.query.BoolQueryBuilder

val privatpersonFilters = listOf(
    Filter(
        key = UnderFacetKeys.INFORMASJON,
        name = UnderFacetNames.INFORMASJON,
        aggregationName = AggregationNames.PRIVATPERSON_INFORMASJON,
        filterQuery = informasjonFilter(ValidAudiences.PERSON)
    ),
    Filter(
        key = UnderFacetKeys.KONTOR,
        name = UnderFacetNames.KONTOR,
        aggregationName = AggregationNames.PRIVATPERSON_KONTOR,
        filterQuery = kontorFilter(ValidAudiences.PERSON)
    ),
    Filter(
        key = UnderFacetKeys.SOKNAD_OG_SKJEMA,
        name = UnderFacetNames.SOKNAD_OG_SKJEMA,
        aggregationName = AggregationNames.PRIVATPERSON_SOKNAD_OG_SKJEMA,
        filterQuery = soknadOgSkjemaFilter(ValidAudiences.PERSON)
    ),
    Filter(
        key = UnderFacetKeys.AKTUELT,
        name = UnderFacetNames.AKTUELT,
        aggregationName = AggregationNames.PRIVATPERSON_AKTUELT,
        filterQuery = aktueltFilter(ValidAudiences.PERSON)
    ),
)

val arbeidsgiverFilters = listOf(
    Filter(
        key = UnderFacetKeys.INFORMASJON,
        name = UnderFacetNames.INFORMASJON,
        aggregationName = AggregationNames.ARBEIDSGIVER_INFORMASJON,
        filterQuery = informasjonFilter(ValidAudiences.EMPLOYER)
    ),
    Filter(
        key = UnderFacetKeys.KONTOR,
        name = UnderFacetNames.KONTOR,
        aggregationName = AggregationNames.ARBEIDSGIVER_KONTOR,
        filterQuery = kontorFilter(ValidAudiences.EMPLOYER)
    ),
    Filter(
        key = UnderFacetKeys.SOKNAD_OG_SKJEMA,
        name = UnderFacetNames.SOKNAD_OG_SKJEMA,
        aggregationName = AggregationNames.ARBEIDSGIVER_SOKNAD_OG_SKJEMA,
        filterQuery = soknadOgSkjemaFilter(ValidAudiences.EMPLOYER)
    ),
    Filter(
        key = UnderFacetKeys.AKTUELT,
        name = UnderFacetNames.AKTUELT,
        aggregationName = AggregationNames.ARBEIDSGIVER_AKTUELT,
        filterQuery = aktueltFilter(ValidAudiences.EMPLOYER)
    ),
)
val samarbeidspartnerFilters = listOf(
    Filter(
        key = UnderFacetKeys.INFORMASJON,
        name = UnderFacetNames.INFORMASJON,
        aggregationName = AggregationNames.SAMARBEIDSPARTNER_INFORMASJON,
        filterQuery = informasjonFilter(ValidAudiences.PROVIDER)
    ),
    Filter(
        key = UnderFacetKeys.KONTOR,
        name = UnderFacetNames.KONTOR,
        aggregationName = AggregationNames.SAMARBEIDSPARTNER_KONTOR,
        filterQuery = kontorFilter(ValidAudiences.PROVIDER)
    ),
    Filter(
        key = UnderFacetKeys.SOKNAD_OG_SKJEMA,
        name = UnderFacetNames.SOKNAD_OG_SKJEMA,
        aggregationName = AggregationNames.SAMARBEIDSPARTNER_SOKNAD_OG_SKJEMA,
        filterQuery = soknadOgSkjemaFilter(ValidAudiences.PROVIDER)
    ),
    Filter(
        key = UnderFacetKeys.AKTUELT,
        name = UnderFacetNames.AKTUELT,
        aggregationName = AggregationNames.SAMARBEIDSPARTNER_AKTUELT,
        filterQuery = aktueltFilter(ValidAudiences.PROVIDER)
    ),
)

private fun informasjonFilter(audience: ValidAudiences) =
    baseFilter(audience).mustHaveMetatags(ValidMetatags.INFORMASJON)

private fun kontorFilter(audience: ValidAudiences) =
    baseFilter(audience).mustHaveOneOfTypes(ValidTypes.KONTOR, ValidTypes.KONTOR_LEGACY)

private fun soknadOgSkjemaFilter(audience: ValidAudiences) = baseFilter(audience).mustHaveOneOfTypes(
    ValidTypes.SKJEMA,
    ValidTypes.SKJEMAOVERSIKT
)

private fun aktueltFilter(audience: ValidAudiences) = baseFilter(audience, isStrict = true).mustHaveMetatags(
    ValidMetatags.NYHET
)

private fun baseFilter(audience: ValidAudiences, isStrict: Boolean = false): BoolQueryBuilder {
    return BoolQueryBuilder()
        .mustNotHaveMetatags(
            ValidMetatags.PRESSEMELDING,
            ValidMetatags.PRESSE,
            ValidMetatags.ANALYSE,
            ValidMetatags.STATISTIKK
        )
        .mustNotHaveField(FYLKE)
        .mustHaveAudience(audience, isStrict)
}