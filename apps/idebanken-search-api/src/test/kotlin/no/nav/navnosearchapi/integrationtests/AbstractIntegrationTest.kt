package no.nav.navnosearchapi.integrationtests

import no.nav.navnosearchadminapi.common.constants.NORWEGIAN_BOKMAAL
import no.nav.navnosearchadminapi.common.repository.ContentRepository
import no.nav.navnosearchapi.integrationtests.config.OpensearchConfig
import no.nav.navnosearchapi.search.filters.FacetKeys
import no.nav.navnosearchapi.utils.initialTestData
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.client.getForEntity
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.context.annotation.Import
import org.springframework.http.ResponseEntity
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.web.util.UriComponentsBuilder
import org.testcontainers.junit.jupiter.Testcontainers

@Testcontainers(disabledWithoutDocker = true)
@Import(OpensearchConfig::class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
@ExtendWith(SpringExtension::class)
abstract class AbstractIntegrationTest {

    @Autowired
    protected lateinit var restTemplate: TestRestTemplate

    @Autowired
    protected lateinit var repository: ContentRepository

    @LocalServerPort
    private var serverPort: Int? = null

    private fun host() = "http://localhost:$serverPort"

    protected fun searchUri(
        ord: String,
        page: Int? = 0,
        f: String? = FacetKeys.PRIVATPERSON,
        uf: List<String>? = emptyList(),
        s: Int? = 0,
        preferredLanguage: String = NORWEGIAN_BOKMAAL,
    ): String {
        return UriComponentsBuilder.fromUriString(host())
            .path("/content/search")
            .queryParamIfPresent("ord", ord)
            .queryParamIfPresent("page", page)
            .queryParamIfPresent("f", f)
            .queryParamIfPresent("uf", uf)
            .queryParamIfPresent("s", s)
            .queryParamIfPresent("preferredLanguage", preferredLanguage)
            .build().toUriString()
    }

    protected fun decoratorSearchUri(
        ord: String,
        f: String? = FacetKeys.PRIVATPERSON,
        preferredLanguage: String = NORWEGIAN_BOKMAAL,
    ): String {
        return UriComponentsBuilder.fromUriString(host())
            .path("/content/decorator-search")
            .queryParamIfPresent("ord", ord)
            .queryParamIfPresent("f", f)
            .queryParamIfPresent("preferredLanguage", preferredLanguage)
            .build().toUriString()
    }

    protected fun searchUrlUri(term: String): String {
        return UriComponentsBuilder.fromUriString(host())
            .path("/content/search-url")
            .queryParam("term", term)
            .build().toUriString()
    }

    private fun UriComponentsBuilder.queryParamIfPresent(name: String, value: Any?): UriComponentsBuilder {
        when (value) {
            is Collection<*> -> value.forEach { queryParam(name, it) }
            else -> value?.let { queryParam(name, value) }
        }
        return this
    }

    protected final inline fun <reified T : Any> get(uri: String): ResponseEntity<T> {
        return restTemplate.getForEntity<T>(uri)
    }

    protected fun setupIndex() {
        repository.deleteAll()
        repository.saveAll(initialTestData)
    }
}