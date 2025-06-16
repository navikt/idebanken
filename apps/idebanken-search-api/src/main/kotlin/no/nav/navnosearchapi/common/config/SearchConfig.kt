package no.nav.navnosearchapi.common.config

import no.nav.navnosearchadminapi.common.constants.ALL_TEXT
import no.nav.navnosearchadminapi.common.constants.EXACT_INNER_FIELD
import no.nav.navnosearchadminapi.common.constants.INGRESS
import no.nav.navnosearchadminapi.common.constants.NGRAMS_INNER_FIELD
import no.nav.navnosearchadminapi.common.constants.TEXT
import no.nav.navnosearchadminapi.common.constants.TITLE
import no.nav.navnosearchadminapi.common.constants.languageSubfields
import no.nav.navnosearchadminapi.common.enums.ValidMetatags
import no.nav.navnosearchadminapi.common.enums.ValidTypes

object SearchConfig {
    const val EXACT_PHRASE_MATCH_BOOST = 1.5f
    const val FUZZY_LOW_DISTANCE = 6
    const val FUZZY_HIGH_DISTANCE = 8
    const val NGRAM_MIN_LENGTH = 3

    val termsToOverride = mapOf("kontakt" to "kontakt oss")

    val fieldsToWeight = buildMap {
        languageSubfields.forEach {
            put("$TITLE.$it", 12.0f)
            put("$INGRESS.$it", 3.0f)
            put("$TEXT.$it", 0.01f)
        }
    }

    val ngramsInnerFieldsToWeight = buildMap {
        languageSubfields.forEach {
            put("$TITLE.$it.$NGRAMS_INNER_FIELD", 11.5f)
            put("$INGRESS.$it.$NGRAMS_INNER_FIELD", 3.0f)
        }
    }

    val exactInnerFieldsToWeight = buildMap {
        languageSubfields.forEach {
            put("$TITLE.$it.$EXACT_INNER_FIELD", 12.0f)
            put("$INGRESS.$it.$EXACT_INNER_FIELD", 6.0f)
            put("$TEXT.$it.$EXACT_INNER_FIELD", 1.0f)
        }
    }

    val typeToWeight = mapOf(
        ValidTypes.OVERSIKT.descriptor to 2.0f,
        ValidTypes.PRODUKTSIDE.descriptor to 2.0f,
        ValidTypes.GUIDE.descriptor to 2.0f,
        ValidTypes.TEMASIDE.descriptor to 1.75f,
        ValidTypes.SITUASJONSSIDE.descriptor to 1.75f,
        ValidTypes.KONTOR.descriptor to 0.50f,
        ValidTypes.KONTOR_LEGACY.descriptor to 0.50f,
    )

    val metatagToWeight = mapOf(
        ValidMetatags.NYHET.descriptor to 0.25f,
    )

    val allTextFields = buildList {
        languageSubfields.forEach {
            add("$ALL_TEXT.$it")
            add("$TITLE.$it.$NGRAMS_INNER_FIELD")
            add("$INGRESS.$it.$NGRAMS_INNER_FIELD")
        }
    }
}
