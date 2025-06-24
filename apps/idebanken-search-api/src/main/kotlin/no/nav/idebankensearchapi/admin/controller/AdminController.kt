package no.nav.idebankensearchapi.admin.controller

import no.nav.idebankensearchapi.admin.config.ApiKeyProtected
import no.nav.idebankensearchapi.admin.dto.inbound.ContentDto
import no.nav.idebankensearchapi.admin.dto.outbound.SaveContentResponse
import no.nav.idebankensearchapi.admin.service.AdminService
import org.springframework.data.domain.Page
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController

@RestController
class AdminController(val service: AdminService) {

    @PostMapping("/content/{teamName}")
    @ApiKeyProtected
    fun saveContent(
        @RequestBody content: List<ContentDto>,
        @PathVariable teamName: String
    ): SaveContentResponse {
        return service.saveAllContent(content, teamName)
    }

    @GetMapping("/content/{teamName}")
    @ApiKeyProtected
    fun getContentForTeamName(
        @PathVariable teamName: String,
        @RequestParam page: Int
    ): Page<ContentDto> {
        return service.getContentForTeamName(teamName, page)
    }

    @DeleteMapping("/content/{teamName}/{id}")
    @ApiKeyProtected
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteContentByTeamNameAndId(@PathVariable teamName: String, @PathVariable id: String) {
        service.deleteContentByTeamNameAndId(teamName, id)
    }
}