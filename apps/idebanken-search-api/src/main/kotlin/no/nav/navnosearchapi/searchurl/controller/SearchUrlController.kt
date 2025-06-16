package no.nav.navnosearchapi.searchurl.controller

import no.nav.navnosearchapi.searchurl.dto.SearchUrlResponse
import no.nav.navnosearchapi.searchurl.service.UrlSearchService
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
    fun searchUrl(@RequestParam term: String): SearchUrlResponse {
        return urlSearchService.search(term)
    }
}

