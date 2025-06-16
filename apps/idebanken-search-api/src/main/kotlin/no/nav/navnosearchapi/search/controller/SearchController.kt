package no.nav.navnosearchapi.search.controller

import no.nav.navnosearchapi.search.dto.DecoratorSearchResult
import no.nav.navnosearchapi.search.dto.SearchResult
import no.nav.navnosearchapi.search.service.CompleteSearchService
import no.nav.navnosearchapi.search.service.DecoratorSearchService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.ModelAttribute
import org.springframework.web.bind.annotation.RestController

@RestController
class SearchController(
    val completeSearchService: CompleteSearchService,
    val decoratorSearchService: DecoratorSearchService,
) {
    @GetMapping("/content/search")
    fun search(@ModelAttribute params: Params): SearchResult {
        return completeSearchService.search(params)
    }

    @GetMapping("/content/decorator-search")
    fun decoratorSearch(@ModelAttribute params: Params): DecoratorSearchResult {
        return decoratorSearchService.search(params)
    }
}

