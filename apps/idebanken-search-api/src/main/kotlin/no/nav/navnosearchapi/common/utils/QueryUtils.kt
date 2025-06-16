package no.nav.navnosearchapi.common.utils

import org.opensearch.common.lucene.search.function.FunctionScoreQuery
import org.opensearch.index.query.BoolQueryBuilder
import org.opensearch.index.query.QueryBuilder
import org.opensearch.index.query.TermQueryBuilder
import org.opensearch.index.query.functionscore.FunctionScoreQueryBuilder
import org.opensearch.index.query.functionscore.ScoreFunctionBuilders

fun QueryBuilder.applyFilters(filterQuery: BoolQueryBuilder?): QueryBuilder {
    return filterQuery?.let { BoolQueryBuilder().must(this).filter(filterQuery) } ?: this
}

fun QueryBuilder.applyWeighting(
    field: String,
    fieldToWeightMap: Map<String, Float>
): FunctionScoreQueryBuilder {
    return FunctionScoreQueryBuilder(
        this,
        fieldToWeightMap.map {
            FunctionScoreQueryBuilder.FilterFunctionBuilder(
                TermQueryBuilder(field, it.key),
                ScoreFunctionBuilders.weightFactorFunction(it.value)
            )
        }.toTypedArray()
    ).scoreMode(FunctionScoreQuery.ScoreMode.MAX)
}