package no.nav.idebankensearchapi.search.controller

import no.nav.idebankensearchapi.search.filters.FacetKeys
import no.nav.navnosearchadminapi.common.constants.NORWEGIAN_BOKMAAL

data class Params(
    val ord: String, // Term
    val page: Int = 0,
    val f: String = FacetKeys.PRIVATPERSON, // Facet key
    val uf: List<String> = emptyList(), // Under-facet keys
    val s: Int = 0, // Sort
    val preferredLanguage: String = NORWEGIAN_BOKMAAL,
)
