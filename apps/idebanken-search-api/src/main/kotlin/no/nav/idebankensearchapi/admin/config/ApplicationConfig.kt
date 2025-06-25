package no.nav.idebankensearchapi.admin.config

import java.time.Clock
import org.springframework.cache.annotation.EnableCaching
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
@EnableCaching
class ApplicationConfig {
//    @Bean
//    fun restTemplate(builder: RestTemplateBuilder): RestTemplate? {
//        return builder.build()
//    }

    @Bean
    fun clock(): Clock {
        return Clock.systemDefaultZone()
    }
}