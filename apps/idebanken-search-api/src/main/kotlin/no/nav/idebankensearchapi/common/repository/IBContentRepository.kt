package no.nav.idebankensearchapi.common.repository

import no.nav.idebankensearchapi.common.model.IBContent
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.repository.CrudRepository

interface IBContentRepository : CrudRepository<IBContent, String> {
    fun findAllByTeamOwnedBy(teamOwnedBy: String, pageable: Pageable): Page<IBContent>
}