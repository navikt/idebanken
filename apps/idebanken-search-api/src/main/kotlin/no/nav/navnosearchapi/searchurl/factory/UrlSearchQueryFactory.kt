package no.nav.navnosearchapi.searchurl.factory

import no.nav.navnosearchadminapi.common.constants.HREF
import no.nav.navnosearchadminapi.common.constants.METATAGS
import no.nav.navnosearchadminapi.common.constants.TYPE
import no.nav.navnosearchapi.common.config.SearchConfig
import no.nav.navnosearchapi.common.utils.applyWeighting
import org.opensearch.common.unit.Fuzziness
import org.opensearch.data.client.orhlc.NativeSearchQueryBuilder
import org.opensearch.index.query.MatchQueryBuilder

object UrlSearchQueryFactory {
    fun createBuilder(term: String): NativeSearchQueryBuilder {
        return NativeSearchQueryBuilder().apply {
            withQuery(
                MatchQueryBuilder(HREF, term).fuzziness(Fuzziness.AUTO)
                    .applyWeighting(TYPE, SearchConfig.typeToWeight)
                    .applyWeighting(METATAGS, SearchConfig.metatagToWeight)
            )
        }
    }
}