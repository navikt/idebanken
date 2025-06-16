package no.nav.navnosearchapi.search.mapper

import no.nav.navnosearchadminapi.common.constants.INGRESS
import no.nav.navnosearchadminapi.common.constants.TEXT
import no.nav.navnosearchadminapi.common.constants.TITLE
import no.nav.navnosearchadminapi.common.enums.ValidTypes
import no.nav.navnosearchadminapi.common.model.Content
import no.nav.navnosearchapi.search.enums.FieldType
import no.nav.navnosearchapi.search.utils.languageSubfieldKey
import org.springframework.data.elasticsearch.core.SearchHit

private const val HIGHLIGHT_MAX_LENGTH = 250
private const val CUTOFF_PREFIX = "… "
private const val CUTOFF_POSTFIX = " …"
private const val TABELL = "Tabell"

fun SearchHit<Content>.toHighlight(isMatchPhraseQuery: Boolean): String {
    if (content.type == ValidTypes.TABELL.descriptor) return TABELL

    val defaultFieldType = if (isMatchPhraseQuery) FieldType.EXACT else FieldType.STANDARD

    val titleHighlight = getHighlightField(TITLE, defaultFieldType)
    val ingressHighlight = getHighlightField(INGRESS, defaultFieldType)
    val textHighlight = getHighlightField(TEXT, defaultFieldType)

    return when {
        ingressHighlight != null -> ingressHighlight.truncateIngress()
        textHighlight != null && titleHighlight == null -> textHighlight.truncateText()
        else -> content.ingress.value.truncateIngress()
    }
}

private fun SearchHit<Content>.getHighlightField(
    baseField: String,
    defaultFieldType: FieldType,
    prioritizedFieldType: FieldType = FieldType.NGRAM
): String? {
    val prioritizedField = languageSubfieldKey(baseField, content.language, prioritizedFieldType)
    val defaultField = languageSubfieldKey(baseField, content.language, defaultFieldType)
    return getHighlightField(prioritizedField).firstOrNull() ?: getHighlightField(defaultField).firstOrNull()
}

private fun String.truncateText(): String {
    return CUTOFF_PREFIX + this.take(HIGHLIGHT_MAX_LENGTH) + CUTOFF_POSTFIX
}

private fun String.truncateIngress(): String {
    return if (length > HIGHLIGHT_MAX_LENGTH) {
        this.take(HIGHLIGHT_MAX_LENGTH) + CUTOFF_POSTFIX
    } else this
}

