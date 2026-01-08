package no.nav.idebankensearchapi.integrationtests.config

import java.time.Duration
import org.opensearch.testcontainers.OpenSearchContainer
import org.springframework.boot.test.context.TestConfiguration

@TestConfiguration
class OpensearchConfig {
    companion object {
        private val opensearch: OpenSearchContainer<*> =
            OpenSearchContainer("opensearchproject/opensearch:2.11.1")
                .withStartupAttempts(5)
                .withStartupTimeout(Duration.ofMinutes(2))

        init {
            opensearch.start()
            System.setProperty("opensearch.uris", opensearch.httpHostAddress)
        }
    }
}
