package no.nav.idebankensearchapi.searchurl.factory

import no.nav.idebankensearchapi.common.config.SearchConfig
import no.nav.idebankensearchapi.common.utils.applyWeighting
import no.nav.navnosearchadminapi.common.constants.HREF
import no.nav.navnosearchadminapi.common.constants.METATAGS
import no.nav.navnosearchadminapi.common.constants.TYPE
import org.opensearch.common.unit.Fuzziness
import org.opensearch.data.client.orhlc.NativeSearchQueryBuilder
import org.opensearch.index.query.MatchQueryBuilder

object UrlSearchQueryFactory {
    fun createBuilder(term: String): NativeSearchQueryBuilder =
        NativeSearchQueryBuilder().apply {
            withQuery(
                MatchQueryBuilder(HREF, term)
                    .fuzziness(Fuzziness.AUTO)
                    .applyWeighting(TYPE, SearchConfig.typeToWeight)
                    .applyWeighting(METATAGS, SearchConfig.metatagToWeight),
            )
        }
}
