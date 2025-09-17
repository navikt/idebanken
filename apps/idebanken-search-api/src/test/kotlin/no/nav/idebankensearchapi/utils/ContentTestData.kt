package no.nav.idebankensearchapi.utils

import java.time.ZonedDateTime
import java.util.UUID
import no.nav.idebankensearchapi.common.model.IBContent
import no.nav.idebankensearchapi.search.filters.FacetKeys
import no.nav.idebankensearchapi.search.filters.UnderFacetKeys
import no.nav.navnosearchadminapi.common.constants.NORWEGIAN_BOKMAAL
import no.nav.navnosearchadminapi.common.enums.ValidAudiences
import no.nav.navnosearchadminapi.common.enums.ValidMetatags
import no.nav.navnosearchadminapi.common.enums.ValidTypes

val now: ZonedDateTime = ZonedDateTime.now()
val nowMinusTwoYears: ZonedDateTime = ZonedDateTime.now().minusYears(2)
val nowMinus10Days: ZonedDateTime = ZonedDateTime.now().minusDays(10)
val nowMinus50Days: ZonedDateTime = ZonedDateTime.now().minusDays(50)

val privatpersonDummyData =
    buildList {
        generatedText.forEach {
            add(it.toPrivatpersonDummyContent(underfacet = UnderFacetKeys.INFORMASJON))
            add(it.toPrivatpersonDummyContent(underfacet = UnderFacetKeys.KONTOR))
            add(it.toPrivatpersonDummyContent(underfacet = UnderFacetKeys.SOKNAD_OG_SKJEMA))
            add(it.toPrivatpersonDummyContent(underfacet = UnderFacetKeys.AKTUELT))
        }
    }

val arbeidsgiverDummyData =
    buildList {
        generatedText.forEach {
            add(it.toArbeidsgiverDummyContent(underfacet = UnderFacetKeys.INFORMASJON))
            add(it.toArbeidsgiverDummyContent(underfacet = UnderFacetKeys.KONTOR))
            add(it.toArbeidsgiverDummyContent(underfacet = UnderFacetKeys.SOKNAD_OG_SKJEMA))
            add(it.toArbeidsgiverDummyContent(underfacet = UnderFacetKeys.AKTUELT))
        }
    }

val samarbeidspartnerDummyData =
    buildList {
        generatedText.forEach {
            add(it.toSamarbeidspartnerDummyContent(underfacet = UnderFacetKeys.INFORMASJON))
            add(it.toSamarbeidspartnerDummyContent(underfacet = UnderFacetKeys.KONTOR))
            add(it.toSamarbeidspartnerDummyContent(underfacet = UnderFacetKeys.SOKNAD_OG_SKJEMA))
            add(it.toSamarbeidspartnerDummyContent(underfacet = UnderFacetKeys.AKTUELT))
        }
    }

val presseDummyData =
    buildList {
        generatedText.forEach {
            add(it.toPresseDummyContent())
        }
    }

val statistikkDummyData =
    buildList {
        generatedText.forEach {
            add(it.toStatistikkDummyContent(UnderFacetKeys.ARTIKLER))
            add(it.toStatistikkDummyContent(UnderFacetKeys.NYHETER))
            add(it.toStatistikkDummyContent(UnderFacetKeys.TABELLER))
        }
    }

val analyserOgForskningDummyData =
    buildList {
        generatedText.forEach {
            add(it.toAnalyserOgForskningDummyContent(UnderFacetKeys.ARTIKLER))
            add(it.toAnalyserOgForskningDummyContent(UnderFacetKeys.NYHETER))
        }
    }


val initialTestData =
    buildList {
        addAll(privatpersonDummyData)
        addAll(arbeidsgiverDummyData)
        addAll(samarbeidspartnerDummyData)
        addAll(presseDummyData)
        addAll(statistikkDummyData)
        addAll(analyserOgForskningDummyData)
    }

fun additionalTestData(
    title: String = "title",
    ingress: String = "ingress",
    text: String = "text",
    facet: String = FacetKeys.PRIVATPERSON,
    underFacet: String = UnderFacetKeys.INFORMASJON,
): IBContent =
    TextData(
        title = title,
        ingress = ingress,
        text = text,
    ).let {
        when (facet) {
            FacetKeys.PRIVATPERSON -> it.toPrivatpersonDummyContent(underFacet)
            FacetKeys.ARBEIDSGIVER -> it.toArbeidsgiverDummyContent(underFacet)
            FacetKeys.SAMARBEIDSPARTNER -> it.toSamarbeidspartnerDummyContent(underFacet)
            FacetKeys.PRESSE -> it.toPresseDummyContent()
            FacetKeys.STATISTIKK -> it.toStatistikkDummyContent(underFacet)
            FacetKeys.ANALYSER_OG_FORSKNING -> it.toAnalyserOgForskningDummyContent(underFacet)
            else -> error("Unsupported facet: $facet")
        }
    }

private fun TextData.toPrivatpersonDummyContent(underfacet: String): IBContent =
    this.toDummyContentForAudience(ValidAudiences.PERSON.descriptor, underfacet)

private fun TextData.toArbeidsgiverDummyContent(underfacet: String): IBContent =
    this.toDummyContentForAudience(ValidAudiences.EMPLOYER.descriptor, underfacet)

private fun TextData.toSamarbeidspartnerDummyContent(underfacet: String): IBContent =
    this.toDummyContentForAudience(ValidAudiences.PROVIDER.descriptor, underfacet)

private fun TextData.toPresseDummyContent(): IBContent =
    this.toDummyContent(
        metatags = listOf(ValidMetatags.PRESSE.descriptor),
    )

private fun TextData.toStatistikkDummyContent(underfacet: String): IBContent =
    when (underfacet) {
        UnderFacetKeys.ARTIKLER ->
            this.toDummyContent(
                metatags = listOf(ValidMetatags.STATISTIKK.descriptor),
            )

        UnderFacetKeys.NYHETER ->
            this.toDummyContent(
                metatags = listOf(ValidMetatags.STATISTIKK.descriptor, ValidMetatags.NYHET.descriptor),
            )

        UnderFacetKeys.TABELLER ->
            this.toDummyContent(
                metatags = listOf(ValidMetatags.STATISTIKK.descriptor),
                type = ValidTypes.TABELL.descriptor,
            )

        else -> error("unsupported underfacet")
    }

private fun TextData.toAnalyserOgForskningDummyContent(underfacet: String): IBContent =
    when (underfacet) {
        UnderFacetKeys.ARTIKLER ->
            this.toDummyContent(
                metatags = listOf(ValidMetatags.ANALYSE.descriptor),
            )

        UnderFacetKeys.NYHETER ->
            this.toDummyContent(
                metatags = listOf(ValidMetatags.ANALYSE.descriptor, ValidMetatags.NYHET.descriptor),
            )

        else -> error("unsupported underfacet")
    }

private fun TextData.toDummyContentForAudience(
    audience: String,
    underfacet: String,
) = when (underfacet) {
    UnderFacetKeys.INFORMASJON ->
        this.toDummyContent(
            audience = listOf(audience),
            metatags = listOf(ValidMetatags.INFORMASJON.descriptor),
        )

    UnderFacetKeys.KONTOR ->
        this.toDummyContent(
            audience = listOf(audience),
            type = ValidTypes.KONTOR.descriptor,
        )

    UnderFacetKeys.SOKNAD_OG_SKJEMA ->
        this.toDummyContent(
            audience = listOf(audience),
            type = ValidTypes.SKJEMA.descriptor,
        )

    UnderFacetKeys.AKTUELT ->
        this.toDummyContent(
            audience = listOf(audience),
            metatags = listOf(ValidMetatags.NYHET.descriptor),
        )

    else -> error("unsupported underfacet")
}

private fun TextData.toDummyContent(
    teamName: String = "test-team",
    href: String = "https://dummy-href.com",
    type: String = ValidTypes.ANDRE.descriptor,
    timestamp: ZonedDateTime = now,
    audience: List<String> = emptyList(),
    language: String = NORWEGIAN_BOKMAAL,
    metatags: List<String> = emptyList(),
) = IBContent.from(
    id = "$teamName-${UUID.randomUUID()}",
    teamOwnedBy = teamName,
    href = href,
    title = title,
    ingress = ingress,
    text = text,
    type = type,
    createdAt = timestamp,
    lastUpdated = timestamp,
    sortByDate = timestamp,
    audience = audience,
    language = language,
    metatags = metatags,
)
