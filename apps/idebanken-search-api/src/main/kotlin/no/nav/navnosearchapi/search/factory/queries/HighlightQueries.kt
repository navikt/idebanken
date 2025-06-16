package no.nav.navnosearchapi.search.factory.queries

import no.nav.navnosearchadminapi.common.constants.INGRESS
import no.nav.navnosearchadminapi.common.constants.NORWEGIAN
import no.nav.navnosearchadminapi.common.constants.TEXT
import no.nav.navnosearchadminapi.common.constants.TITLE
import no.nav.navnosearchadminapi.common.constants.languageSubfields
import no.nav.navnosearchapi.search.enums.FieldType
import no.nav.navnosearchapi.search.utils.languageSubfieldKey
import org.opensearch.index.query.QueryBuilder
import org.opensearch.search.fetch.subphase.highlight.HighlightBuilder
import org.opensearch.search.fetch.subphase.highlight.HighlightBuilder.DEFAULT_FRAGMENT_CHAR_SIZE

private const val BOLD_PRETAG = "<b>"
private const val BOLD_POSTTAG = "</b>"

private const val UNFRAGMENTED = 0
private const val SINGLE_FRAGMENT = 1
private const val MAX_FRAGMENT_SIZE = 200

fun highlightBuilder(query: QueryBuilder, isMatchPhraseQuery: Boolean): HighlightBuilder {
    val defaultFieldType = if (isMatchPhraseQuery) FieldType.EXACT else FieldType.STANDARD
    val includeNgrams = !isMatchPhraseQuery

    return HighlightBuilder()
        .highlightQuery(query) // Må bruke query uten function score for å få riktige highlights
        .preTags(BOLD_PRETAG)
        .postTags(BOLD_POSTTAG)
        .highlightFields(TITLE, defaultFieldType)
        .highlightFields(INGRESS, defaultFieldType, includeNgrams)
        .highlightFields(TEXT, defaultFieldType, includeNgrams)
}

private fun HighlightBuilder.highlightFields(
    baseField: String,
    defaultFieldType: FieldType,
    includeNgrams: Boolean = false
) = apply {
    languageSubfields.forEach { this.field(baseField, it, defaultFieldType) }

    if (includeNgrams) {
        this.field(baseField, NORWEGIAN, FieldType.NGRAM)
    }
}

private fun HighlightBuilder.field(
    baseField: String,
    language: String,
    fieldType: FieldType,
) {
    val fieldName = languageSubfieldKey(baseField, language, fieldType)

    when (baseField) {
        TITLE, INGRESS -> this.field(fieldName, DEFAULT_FRAGMENT_CHAR_SIZE, UNFRAGMENTED)
        TEXT -> this.field(fieldName, MAX_FRAGMENT_SIZE, SINGLE_FRAGMENT)
        else -> throw IllegalArgumentException("Ugyldig verdi for baseField: $baseField")
    }
}