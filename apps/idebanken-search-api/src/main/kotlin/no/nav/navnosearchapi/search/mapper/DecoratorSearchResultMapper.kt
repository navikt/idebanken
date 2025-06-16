package no.nav.navnosearchapi.search.mapper

import no.nav.navnosearchadminapi.common.model.Content
import no.nav.navnosearchapi.search.controller.Params
import no.nav.navnosearchapi.search.dto.DecoratorSearchHit
import no.nav.navnosearchapi.search.dto.DecoratorSearchResult
import no.nav.navnosearchapi.search.utils.isInQuotes
import org.springframework.data.elasticsearch.core.SearchHit
import org.springframework.data.elasticsearch.core.SearchPage

fun SearchPage<Content>.toDecoratorSearchResult(params: Params) = DecoratorSearchResult(
    preferredLanguage = params.preferredLanguage,
    word = params.ord,
    total = totalElements,
    hits = searchHits.searchHits.map { it.toHit(params.ord.isInQuotes()) },
)


private fun SearchHit<Content>.toHit(isMatchPhraseQuery: Boolean) = DecoratorSearchHit(
    displayName = content.title.value,
    href = content.href,
    highlight = this.toHighlight(isMatchPhraseQuery),
)