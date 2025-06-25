package no.nav.idebankensearchapi.search.controller

import no.nav.idebankensearchapi.search.dto.DecoratorSearchResult
import no.nav.idebankensearchapi.search.dto.SearchResult
import no.nav.idebankensearchapi.search.service.CompleteSearchService
import no.nav.idebankensearchapi.search.service.DecoratorSearchService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.ModelAttribute
import org.springframework.web.bind.annotation.RestController

@RestController
class SearchController(
    val completeSearchService: CompleteSearchService,
    val decoratorSearchService: DecoratorSearchService,
) {
    @GetMapping("/content/search")
    fun search(
        @ModelAttribute params: Params,
    ): SearchResult = completeSearchService.search(params)

    @GetMapping("/content/decorator-search")
    fun decoratorSearch(
        @ModelAttribute params: Params,
    ): DecoratorSearchResult = decoratorSearchService.search(params)
}
