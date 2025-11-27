package no.nav.idebankensearchapi.admin.dto.inbound

import java.time.ZonedDateTime
import java.util.Collections.emptyList
import no.nav.navnosearchadminapi.common.enums.ValidTypes

data class ContentMetadata(
    val type: String = ValidTypes.ANDRE.descriptor,
    val createdAt: ZonedDateTime? = null,
    val lastUpdated: ZonedDateTime? = null,
    val audience: List<String>? = null,
    val language: String? = null,
    val metatags: List<String> = emptyList(),
    val languageRefs: List<String> = emptyList(),
    val iconUrl: String? = null,
    val iconColor: String? = null,
    val themeTags: List<String> = emptyList(),
    val typeTags: List<String> = emptyList(),
)