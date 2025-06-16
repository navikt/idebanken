package no.nav.navnosearchapi.integrationtests.config

import org.opensearch.testcontainers.OpensearchContainer
import org.springframework.boot.test.context.TestConfiguration
import java.time.Duration

@TestConfiguration
class OpensearchConfig {
    companion object {
        private val opensearch: OpensearchContainer<*> = OpensearchContainer("opensearchproject/opensearch:2.11.1")
            .withStartupAttempts(5)
            .withStartupTimeout(Duration.ofMinutes(2))

        init {
            opensearch.start()
            System.setProperty("opensearch.uris", opensearch.httpHostAddress)
        }
    }
}