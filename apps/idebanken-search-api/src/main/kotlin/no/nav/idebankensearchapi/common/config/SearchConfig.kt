package no.nav.idebankensearchapi.common.config

import no.nav.navnosearchadminapi.common.constants.ALL_TEXT
import no.nav.navnosearchadminapi.common.constants.EXACT_INNER_FIELD
import no.nav.navnosearchadminapi.common.constants.INGRESS
import no.nav.navnosearchadminapi.common.constants.NGRAMS_INNER_FIELD
import no.nav.navnosearchadminapi.common.constants.TEXT
import no.nav.navnosearchadminapi.common.constants.TITLE
import no.nav.navnosearchadminapi.common.constants.ValidMetatags
import no.nav.navnosearchadminapi.common.constants.languageSubfields

const val KEYWORDS = "keywords"

enum class ValidTypes {
    KJERNEARTIKKEL,
    SECTION_PAGE,
    ARTIKKEL;

    open val descriptor: String = name.lowercase().replace("_", "-")
}

object SearchConfig {
    const val EXACT_PHRASE_MATCH_BOOST = 1.5f
    const val FUZZY_LOW_DISTANCE = 6
    const val FUZZY_HIGH_DISTANCE = 8
    const val NGRAM_MIN_LENGTH = 3

    val termsToOverride = mapOf("kontakt" to "kontakt oss")

    val fieldsToWeight =
        buildMap {
            languageSubfields.forEach {
                put("$TITLE.$it", 12.0f)
                put("$INGRESS.$it", 3.0f)
                put("$KEYWORDS.$it", 2.0f)
                put("$TEXT.$it", 0.01f)
            }
        }

    val ngramsInnerFieldsToWeight =
        buildMap {
            languageSubfields.forEach {
                put("$TITLE.$it.$NGRAMS_INNER_FIELD", 11.5f)
                put("$INGRESS.$it.$NGRAMS_INNER_FIELD", 3.0f)
                put("$KEYWORDS.$it.$NGRAMS_INNER_FIELD", 2.0f)
            }
        }

    val exactInnerFieldsToWeight =
        buildMap {
            languageSubfields.forEach {
                put("$TITLE.$it.$EXACT_INNER_FIELD", 12.0f)
                put("$INGRESS.$it.$EXACT_INNER_FIELD", 6.0f)
                put("$KEYWORDS.$it.$EXACT_INNER_FIELD", 4.0f)
                put("$TEXT.$it.$EXACT_INNER_FIELD", 1.0f)
            }
        }

    val typeToWeight =
        mapOf(
            ValidTypes.KJERNEARTIKKEL.descriptor to 2.0f,
            ValidTypes.SECTION_PAGE.descriptor to 1.5f,
            ValidTypes.ARTIKKEL.descriptor to 1.0f,
        )

    val metatagToWeight =
        mapOf(
            ValidMetatags.NYHET.descriptor to 0.25f,
        )

    val allTextFields =
        buildList {
            languageSubfields.forEach {
                add("$ALL_TEXT.$it")
                add("$TITLE.$it.$NGRAMS_INNER_FIELD")
                add("$INGRESS.$it.$NGRAMS_INNER_FIELD")
                add("$KEYWORDS.$it.$NGRAMS_INNER_FIELD")
            }
        }
}
