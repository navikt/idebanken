package no.nav.idebankensearchapi.admin.dto.inbound

data class ContentDto(
    val id: String? = null,
    val href: String? = null,
    val title: String? = null,
    val ingress: String? = null,
    val text: String? = null,
    val metadata: ContentMetadata? = null,
)