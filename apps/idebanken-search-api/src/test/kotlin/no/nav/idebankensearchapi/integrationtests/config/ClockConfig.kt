package no.nav.idebankensearchapi.integrationtests.config

import java.time.Clock
import no.nav.idebankensearchapi.utils.fixedNow
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Primary

@TestConfiguration
class ClockConfig {
    @Bean
    @Primary
    fun fixedClock(): Clock {
        return fixedNow.let { Clock.fixed(it.toInstant(), it.zone) }
    }
}