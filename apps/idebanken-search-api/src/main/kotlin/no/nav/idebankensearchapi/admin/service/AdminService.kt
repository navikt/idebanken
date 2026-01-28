package no.nav.idebankensearchapi.admin.service

import no.nav.idebankensearchapi.admin.dto.inbound.ContentDto
import no.nav.idebankensearchapi.admin.dto.outbound.SaveContentResponse
import no.nav.idebankensearchapi.admin.service.mapper.toInbound
import no.nav.idebankensearchapi.admin.service.mapper.toOutbound
import no.nav.idebankensearchapi.admin.service.validation.ContentDtoValidator
import no.nav.idebankensearchapi.admin.utils.createInternalId
import no.nav.idebankensearchapi.common.repository.IBContentRepository
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service

@Service
class AdminService(
    val validator: ContentDtoValidator,
    val repository: IBContentRepository,
    @Value("\${opensearch.page-size}") val pageSize: Int,
) {
    val logger: Logger = LoggerFactory.getLogger(AdminService::class.java)

    fun saveAllContent(
        content: List<ContentDto>,
        teamName: String,
    ): SaveContentResponse {
        val validationErrors = validator.validate(content)

        if (validationErrors.isNotEmpty()) {
            logger.warn("Fikk valideringsfeil ved indeksering av innhold: $validationErrors")
        }

        val mappedContent =
            content
                .filter { !validationErrors.containsKey(it.id) }
                .map { it.toInbound(teamName) }
        repository.saveAll(mappedContent)

        val numberOfIndexedDocuments = mappedContent.size
        val numberOfFailedDocuments = validationErrors.size
        logger.info("$numberOfIndexedDocuments dokumenter indeksert, $numberOfFailedDocuments dokumenter feilet")

        return SaveContentResponse(numberOfIndexedDocuments, numberOfFailedDocuments, validationErrors)
    }

    fun deleteContentByTeamNameAndId(
        teamName: String,
        externalId: String,
    ) {
        val id = createInternalId(teamName, externalId)
        if (repository.existsById(id)) {
            repository.deleteById(id)
        } else {
            logger.info("Forsøkte å slette dokument med ekstern id $externalId, men dette finnes ikke for team $teamName")
        }
    }

    fun getContentForTeamName(
        teamName: String,
        page: Int,
    ): Page<ContentDto> {
        val pageable = PageRequest.of(page, pageSize)
        return repository.findAllByTeamOwnedBy(teamName, pageable).map { it.toOutbound() }
    }
}
