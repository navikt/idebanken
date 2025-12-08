package no.nav.idebankensearchapi.search.filters

object FieldNames {
    const val TYPE_TAGS = "typeTags"
}

object FacetKeys {
    const val TYPE_TAGS = "type-tag"
    const val PRIVATPERSON = "privatperson"
    const val ARBEIDSGIVER = "arbeidsgiver"
    const val SAMARBEIDSPARTNER = "samarbeidspartner"
    const val PRESSE = "presse"
    const val STATISTIKK = "statistikk"
    const val ANALYSER_OG_FORSKNING = "analyser-og-forskning"
}

object FacetNames {
    const val TYPE_TAGS = "Type-tag"
    const val PRIVATPERSON = "Privatperson"
    const val ARBEIDSGIVER = "Arbeidsgiver"
    const val SAMARBEIDSPARTNER = "Samarbeidspartner"
    const val PRESSE = "Presse"
    const val STATISTIKK = "Statistikk"
    const val ANALYSER_OG_FORSKNING = "Analyser og forskning"
}

object UnderFacetKeys {
    const val INFORMASJON = "informasjon"
    const val KONTOR = "kontor"
    const val SOKNAD_OG_SKJEMA = "soknad-og-skjema"
    const val AKTUELT = "aktuelt"
    const val ARTIKLER = "artikler"
    const val NYHETER = "nyheter"
    const val TABELLER = "tabeller"
}

object UnderFacetNames {
    const val INFORMASJON = "Informasjon"
    const val KONTOR = "Kontor"
    const val SOKNAD_OG_SKJEMA = "Søknad og skjema"
    const val AKTUELT = "Aktuelt"
    const val ARTIKLER = "Artikler"
    const val NYHETER = "Nyheter"
    const val TABELLER = "Tabeller"
}

object AggregationNames {
    const val PRIVATPERSON_INFORMASJON = FacetNames.PRIVATPERSON + UnderFacetNames.INFORMASJON
    const val PRIVATPERSON_KONTOR = FacetNames.PRIVATPERSON + UnderFacetNames.KONTOR
    const val PRIVATPERSON_SOKNAD_OG_SKJEMA = FacetNames.PRIVATPERSON + UnderFacetNames.SOKNAD_OG_SKJEMA
    const val PRIVATPERSON_AKTUELT = FacetNames.PRIVATPERSON + UnderFacetNames.AKTUELT
    const val ARBEIDSGIVER_INFORMASJON = FacetNames.ARBEIDSGIVER + UnderFacetNames.INFORMASJON
    const val ARBEIDSGIVER_KONTOR = FacetNames.ARBEIDSGIVER + UnderFacetNames.KONTOR
    const val ARBEIDSGIVER_SOKNAD_OG_SKJEMA = FacetNames.ARBEIDSGIVER + UnderFacetNames.SOKNAD_OG_SKJEMA
    const val ARBEIDSGIVER_AKTUELT = FacetNames.ARBEIDSGIVER + UnderFacetNames.AKTUELT
    const val SAMARBEIDSPARTNER_INFORMASJON = FacetNames.SAMARBEIDSPARTNER + UnderFacetNames.INFORMASJON
    const val SAMARBEIDSPARTNER_KONTOR = FacetNames.SAMARBEIDSPARTNER + UnderFacetNames.KONTOR
    const val SAMARBEIDSPARTNER_SOKNAD_OG_SKJEMA = FacetNames.SAMARBEIDSPARTNER + UnderFacetNames.SOKNAD_OG_SKJEMA
    const val SAMARBEIDSPARTNER_AKTUELT = FacetNames.SAMARBEIDSPARTNER + UnderFacetNames.AKTUELT
    const val STATISTIKK_ARTIKLER = FacetNames.STATISTIKK + UnderFacetNames.ARTIKLER
    const val STATISTIKK_NYHETER = FacetNames.STATISTIKK + UnderFacetNames.NYHETER
    const val STATISTIKK_TABELLER = FacetNames.STATISTIKK + UnderFacetNames.TABELLER
    const val ANALYSER_OG_FORSKNING_ARTIKLER = FacetNames.ANALYSER_OG_FORSKNING + UnderFacetNames.ARTIKLER
    const val ANALYSER_OG_FORSKNING_NYHETER = FacetNames.ANALYSER_OG_FORSKNING + UnderFacetNames.NYHETER
}
