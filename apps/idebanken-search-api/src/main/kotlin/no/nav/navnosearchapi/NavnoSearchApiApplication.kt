package no.nav.navnosearchapi

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.data.elasticsearch.ElasticsearchDataAutoConfiguration
import org.springframework.boot.runApplication
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories

@SpringBootApplication(exclude = [ElasticsearchDataAutoConfiguration::class])
@EnableElasticsearchRepositories(basePackages = ["no.nav.navnosearchadminapi.common"])
class NavnoSearchApiApplication

fun main(args: Array<String>) {
    runApplication<NavnoSearchApiApplication>(*args)
}
