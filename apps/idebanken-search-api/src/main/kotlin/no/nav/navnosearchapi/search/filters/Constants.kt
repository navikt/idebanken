package no.nav.navnosearchapi.search.filters

object FacetKeys {
    const val PRIVATPERSON = "privatperson"
    const val ARBEIDSGIVER = "arbeidsgiver"
    const val SAMARBEIDSPARTNER = "samarbeidspartner"
    const val PRESSE = "presse"
    const val STATISTIKK = "statistikk"
    const val ANALYSER_OG_FORSKNING = "analyser-og-forskning"
    const val INNHOLD_FRA_FYLKER = "innhold-fra-fylker"
}

object FacetNames {
    const val PRIVATPERSON = "Privatperson"
    const val ARBEIDSGIVER = "Arbeidsgiver"
    const val SAMARBEIDSPARTNER = "Samarbeidspartner"
    const val PRESSE = "Presse"
    const val STATISTIKK = "Statistikk"
    const val ANALYSER_OG_FORSKNING = "Analyser og forskning"
    const val INNHOLD_FRA_FYLKER = "Innhold fra fylker"
}

object UnderFacetKeys {
    const val INFORMASJON = "informasjon"
    const val KONTOR = "kontor"
    const val SOKNAD_OG_SKJEMA = "soknad-og-skjema"
    const val AKTUELT = "aktuelt"
    const val ARTIKLER = "artikler"
    const val NYHETER = "nyheter"
    const val TABELLER = "tabeller"
    const val AGDER = "agder"
    const val INNLANDET = "innlandet"
    const val MORE_OG_ROMSDAL = "more-og-romsdal"
    const val NORDLAND = "nordland"
    const val OSLO = "oslo"
    const val ROGALAND = "rogaland"
    const val TROMS_OG_FINNMARK = "troms-og-finnmark"
    const val TRONDELAG = "trondelag"
    const val VESTFOLD_OG_TELEMARK = "vestfold-og-telemark"
    const val VESTLAND = "vestland"
    const val VEST_VIKEN = "vest-viken"
    const val OST_VIKEN = "ost-viken"
}

object UnderFacetNames {
    const val INFORMASJON = "Informasjon"
    const val KONTOR = "Kontor"
    const val SOKNAD_OG_SKJEMA = "Søknad og skjema"
    const val AKTUELT = "Aktuelt"
    const val ARTIKLER = "Artikler"
    const val NYHETER = "Nyheter"
    const val TABELLER = "Tabeller"
    const val AGDER = "Agder"
    const val INNLANDET = "Innlandet"
    const val MORE_OG_ROMSDAL = "Møre og Romsdal"
    const val NORDLAND = "Nordland"
    const val OSLO = "Oslo"
    const val ROGALAND = "Rogaland"
    const val TROMS_OG_FINNMARK = "Troms og Finnmark"
    const val TRONDELAG = "Trøndelag"
    const val VESTFOLD_OG_TELEMARK = "Vestfold og Telemark"
    const val VESTLAND = "Vestland"
    const val VEST_VIKEN = "Vest-Viken"
    const val OST_VIKEN = "Øst-Viken"
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