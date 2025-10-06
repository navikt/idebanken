package no.nav.idebankensearchapi.admin.service.mapper

import no.nav.idebankensearchapi.admin.dto.inbound.ContentDto
import no.nav.idebankensearchapi.admin.dto.inbound.ContentMetadata
import no.nav.idebankensearchapi.admin.utils.extractExternalId
import no.nav.idebankensearchapi.common.model.IBContent

fun IBContent.toOutbound() = ContentDto(
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
        metatags = metatags,
        languageRefs = languageRefs,
        iconUrl = iconUrl,
        iconColor = iconColor,
        categories = categories
    )
)