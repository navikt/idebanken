package no.nav.idebankensearchapi.searchurl.controller

import no.nav.idebankensearchapi.searchurl.dto.SearchUrlResponse
import no.nav.idebankensearchapi.searchurl.service.UrlSearchService
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class SearchUrlController(
    val urlSearchService: UrlSearchService,
) {
    @GetMapping("/content/search-url")
    @CrossOrigin
    fun searchUrl(
        @RequestParam term: String,
    ): SearchUrlResponse = urlSearchService.search(term)
}
