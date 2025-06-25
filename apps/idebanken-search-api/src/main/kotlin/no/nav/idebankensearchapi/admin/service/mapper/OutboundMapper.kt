package no.nav.idebankensearchapi.admin.service.mapper

import no.nav.idebankensearchapi.admin.dto.inbound.ContentDto
import no.nav.idebankensearchapi.admin.dto.inbound.ContentMetadata
import no.nav.idebankensearchapi.admin.utils.extractExternalId
import no.nav.navnosearchadminapi.common.model.Content

fun Content.toOutbound() = ContentDto(
    id = extractExternalId(id, teamOwnedBy),
    href = href,
    title = title.value,
    ingress = ingress.value,
    text = text.value,
    metadata = ContentMetadata(
        type = type,
        createdAt = createdAt,
        lastUpdated = lastUpdated,
        audience = audience,
        language = language,
        fylke = fylke,
        metatags = metatags,
        languageRefs = languageRefs,
    )
)