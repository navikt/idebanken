package no.nav.idebankensearchapi.integrationtests

import com.fasterxml.jackson.databind.ObjectMapper
import no.nav.idebankensearchapi.admin.config.HeaderCheckAspect.Companion.API_KEY_HEADER
import no.nav.idebankensearchapi.integrationtests.config.ClockConfig
import no.nav.idebankensearchapi.integrationtests.config.OpensearchConfig
import no.nav.idebankensearchapi.utils.initialAdminTestData
import no.nav.navnosearchadminapi.common.repository.ContentRepository
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.client.exchange
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.cache.CacheManager
import org.springframework.cloud.contract.wiremock.AutoConfigureWireMock
import org.springframework.context.annotation.Import
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.http.ResponseEntity
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.testcontainers.junit.jupiter.Testcontainers

@Testcontainers(disabledWithoutDocker = true)
@Import(OpensearchConfig::class, ClockConfig::class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
@ExtendWith(SpringExtension::class)
@AutoConfigureWireMock(port = 0)
abstract class AbstractAdminIntegrationTest {

    @Autowired
    lateinit var objectMapper: ObjectMapper

    @Autowired
    lateinit var restTemplate: TestRestTemplate

    @Autowired
    lateinit var repository: ContentRepository

    @Autowired
    lateinit var cacheManager: CacheManager

    @LocalServerPort
    var serverPort: Int? = null

    @Value("\${api-key}")
    lateinit var apiKey: String

    protected fun host() = "http://localhost:$serverPort"

    protected fun indexCount() = repository.count()

    protected fun setupIndex() {
        repository.deleteAll()
        repository.saveAll(initialAdminTestData)
    }

    protected fun get(path: String, headers: HttpHeaders = headers()): ResponseEntity<String> {
        return restTemplate.exchange(
            "${host()}/$path",
            HttpMethod.GET,
            HttpEntity<Any>(headers),
        )
    }

    protected fun <T> post(path: String, content: T, headers: HttpHeaders = headers()): ResponseEntity<String> {
        return restTemplate.exchange(
            "${host()}/$path",
            HttpMethod.POST,
            HttpEntity(listOf(content), headers),
        )
    }

    protected fun delete(path: String, headers: HttpHeaders = headers()): ResponseEntity<String> {
        return restTemplate.exchange(
            "${host()}/$path",
            HttpMethod.DELETE,
            HttpEntity<Any>(headers),
        )
    }

    protected fun headers(isApiKeyValid: Boolean = true): HttpHeaders {
        return HttpHeaders().apply { if (isApiKeyValid) add(API_KEY_HEADER, apiKey) }
    }

    protected fun readFile(name: String): String {
        return {}.javaClass.getResource(name)!!.readText()
    }
}