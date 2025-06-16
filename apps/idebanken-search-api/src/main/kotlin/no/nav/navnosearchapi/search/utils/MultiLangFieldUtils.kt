package no.nav.navnosearchapi.search.utils

import no.nav.navnosearchadminapi.common.constants.ENGLISH
import no.nav.navnosearchadminapi.common.constants.EXACT_INNER_FIELD
import no.nav.navnosearchadminapi.common.constants.NGRAMS_INNER_FIELD
import no.nav.navnosearchadminapi.common.constants.NORWEGIAN
import no.nav.navnosearchadminapi.common.constants.NORWEGIAN_BOKMAAL
import no.nav.navnosearchadminapi.common.constants.NORWEGIAN_NYNORSK
import no.nav.navnosearchadminapi.common.constants.OTHER
import no.nav.navnosearchapi.search.enums.FieldType

private const val NORWEGIAN_SUFFIX = ".$NORWEGIAN"
private const val ENGLISH_SUFFIX = ".$ENGLISH"
private const val OTHER_SUFFIX = ".$OTHER"
private const val EXACT_INNER_FIELD_SUFFIX = ".$EXACT_INNER_FIELD"
private const val NGRAMS_INNER_FIELD_SUFFIX = ".$NGRAMS_INNER_FIELD"

fun languageSubfieldKey(
    baseField: String,
    language: String,
    fieldType: FieldType,
): String {
    return buildString {
        append(baseField)
        append(
            when (language) {
                NORWEGIAN, NORWEGIAN_BOKMAAL, NORWEGIAN_NYNORSK -> NORWEGIAN_SUFFIX
                ENGLISH -> ENGLISH_SUFFIX
                else -> OTHER_SUFFIX
            }
        )
        append(
            when (fieldType) {
                FieldType.EXACT -> EXACT_INNER_FIELD_SUFFIX
                FieldType.NGRAM -> NGRAMS_INNER_FIELD_SUFFIX
                else -> ""
            }
        )
    }
}