package no.nav.navnosearchapi.search.factory.queries

import no.nav.navnosearchapi.common.config.SearchConfig
import org.opensearch.common.unit.Fuzziness
import org.opensearch.index.query.BoolQueryBuilder
import org.opensearch.index.query.DisMaxQueryBuilder
import org.opensearch.index.query.MultiMatchQueryBuilder
import org.opensearch.index.query.Operator

fun searchAllTextQuery(term: String, skjemanummer: String? = null): BoolQueryBuilder {
    return BoolQueryBuilder()
        // Filter (bidrar ikke til score) - alle treff må inneholde alle søkeord (på tvers av feltene)
        .filter(containsAllWordsInTermQuery(term))
        .should(
            // Bruker subquery med høyest score
            DisMaxQueryBuilder().apply {
                add(standardSearchQuery(term))
                if (term.trim().length >= SearchConfig.NGRAM_MIN_LENGTH) add(ngramSearchQuery(term))
                if (term.split(" ").size > 1) add(exactPhraseSearchQuery(term))
            }
        ).apply {
            // Krever ekstakt match på skjemanummer dersom det er satt
            skjemanummer?.let { this.must(searchAllTextForPhraseQuery(it)) }
        }
}

fun searchAllTextForPhraseQuery(term: String): MultiMatchQueryBuilder {
    return MultiMatchQueryBuilder(term)
        .fields(SearchConfig.exactInnerFieldsToWeight)
        .type(MultiMatchQueryBuilder.Type.PHRASE)
}

private fun containsAllWordsInTermQuery(term: String): MultiMatchQueryBuilder? {
    return MultiMatchQueryBuilder(term)
        .fuzziness(Fuzziness.customAuto(SearchConfig.FUZZY_LOW_DISTANCE, SearchConfig.FUZZY_HIGH_DISTANCE))
        .operator(Operator.AND)
        .apply { SearchConfig.allTextFields.forEach { this.field(it) } }
}

private fun standardSearchQuery(term: String): MultiMatchQueryBuilder {
    return MultiMatchQueryBuilder(term)
        .fields(SearchConfig.fieldsToWeight)
        .fuzziness(Fuzziness.customAuto(SearchConfig.FUZZY_LOW_DISTANCE, SearchConfig.FUZZY_HIGH_DISTANCE))
}

private fun ngramSearchQuery(term: String): MultiMatchQueryBuilder {
    return MultiMatchQueryBuilder(term)
        .fields(SearchConfig.ngramsInnerFieldsToWeight)
        .operator(Operator.AND)
}

private fun exactPhraseSearchQuery(term: String): MultiMatchQueryBuilder {
    return searchAllTextForPhraseQuery(term).boost(SearchConfig.EXACT_PHRASE_MATCH_BOOST)
}
