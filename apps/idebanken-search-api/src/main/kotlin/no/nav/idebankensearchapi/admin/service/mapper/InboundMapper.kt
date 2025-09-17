package no.nav.idebankensearchapi.admin.service.mapper

import no.nav.idebankensearchapi.admin.dto.inbound.ContentDto
import no.nav.idebankensearchapi.admin.dto.inbound.ContentMetadata
import no.nav.idebankensearchapi.admin.utils.createInternalId
import no.nav.idebankensearchapi.common.model.IBContent
import no.nav.navnosearchadminapi.common.constants.NORWEGIAN
import no.nav.navnosearchadminapi.common.constants.NORWEGIAN_BOKMAAL
import no.nav.navnosearchadminapi.common.enums.ValidMetatags
import no.nav.navnosearchadminapi.common.enums.ValidTypes
import org.jsoup.Jsoup
import org.slf4j.Logger
import org.slf4j.LoggerFactory

private val logger: Logger = LoggerFactory.getLogger("InboundMapper")

private const val MACROS_PATTERN = """\[.*?]"""

fun ContentDto.toInbound(teamName: String): IBContent {
    requireNotNull(id) { "id kan ikke være null" }
    requireNotNull(href) { "href kan ikke være null" }
    requireNotNull(title) { "title kan ikke være null" }
    requireNotNull(ingress) { "ingress kan ikke være null" }
    requireNotNull(text) { "text kan ikke være null" }
    requireNotNull(metadata) { "metadata kan ikke være null" }
    requireNotNull(metadata.createdAt) { "metadata.createdAt kan ikke være null" }
    requireNotNull(metadata.lastUpdated) { "metadata.lastUpdated kan ikke være null" }
    requireNotNull(metadata.language) { "metadata.language kan ikke være null" }

    return IBContent.from(
        id = createInternalId(teamName, id),
        teamOwnedBy = teamName,
        href = href,
        title = title,
        ingress = ingress.removeHtmlAndMacros(),
        text = text.removeHtmlAndMacros(),
        type = metadata.type,
        createdAt = metadata.createdAt,
        lastUpdated = metadata.lastUpdated,
        sortByDate = if (isNyhet()) metadata.createdAt else metadata.lastUpdated,
        audience = metadata.audience ?: listOf(),
        language = resolveLanguage(metadata.language),
        metatags = resolveMetatags(metadata, id),
        languageRefs = metadata.languageRefs
            .map { resolveLanguage(it) }
            .filter { it != resolveLanguage(metadata.language) },
        includeTypeInAllText = shouldBeIncludedInAllTextField(metadata.type),
        iconName = metadata.iconName,
        iconColor = metadata.iconColor,
        categories = metadata.categories
    )
}
private fun shouldBeIncludedInAllTextField(type: String) = type in listOf(ValidTypes.SKJEMA.descriptor)
private fun String.removeHtmlAndMacros(): String {
    // Må parses to ganger av Jsoup av ukjent årsak
    return Jsoup.parse(this).text()
        .replace(Regex(MACROS_PATTERN), "")
        .let { Jsoup.parse(it).text() }
}
private fun resolveLanguage(language: String) = when {
    language.equals(NORWEGIAN, ignoreCase = true) -> NORWEGIAN_BOKMAAL
    else -> language.lowercase()
}

private fun resolveMetatags(metadata: ContentMetadata, id: String): List<String> {
    return if (isInformasjon(metadata)) {
        logger.info("Setter default metatag informasjon for dokument med id $id")
        listOf(ValidMetatags.INFORMASJON.descriptor)
    } else {
        metadata.metatags
    }
}

private fun isInformasjon(metadata: ContentMetadata): Boolean {
    return metadata.metatags.isEmpty() && metadata.type !in listOf(
        ValidTypes.SKJEMA.descriptor,
        ValidTypes.SKJEMAOVERSIKT.descriptor,
        ValidTypes.KONTOR.descriptor,
        ValidTypes.KONTOR_LEGACY.descriptor,
    )
}


private fun ContentDto.isNyhet() = metadata?.metatags?.contains(ValidMetatags.NYHET.descriptor) ?: false
