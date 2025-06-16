package no.nav.navnosearchapi.integrationtests

import io.kotest.assertions.assertSoftly
import io.kotest.matchers.nulls.shouldBeNull
import io.kotest.matchers.shouldBe
import no.nav.navnosearchapi.searchurl.dto.SearchUrlResponse
import no.nav.navnosearchapi.utils.additionalTestData
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.http.HttpStatus

class SearchUrlIntegrationTest : AbstractIntegrationTest() {

    @BeforeEach
    fun setup() {
        setupIndex()
        repository.save(additionalTestData().copy(href = EXACT_URL))
    }

    @Test
    fun `søk med eksakt match skal returnere respons`() {
        val response = get<SearchUrlResponse>(searchUrlUri(EXACT_URL))

        response.statusCode shouldBe HttpStatus.OK
        assertSoftly(response.body!!) {
            url!! shouldBe EXACT_URL
            title!! shouldBe TITLE
        }
    }

    @Test
    fun `søk med fuzzy match skal returnere respons`() {
        val response = get<SearchUrlResponse>(searchUrlUri(FUZZY_URL))

        response.statusCode shouldBe HttpStatus.OK
        assertSoftly(response.body!!) {
            url!! shouldBe EXACT_URL
            title!! shouldBe TITLE
        }
    }

    @Test
    fun `søk uten match skal returnere tom respons`() {
        val response = get<SearchUrlResponse>(searchUrlUri(NON_MATCHING_URL))

        response.statusCode shouldBe HttpStatus.OK
        assertSoftly(response.body!!) {
            url.shouldBeNull()
            title.shouldBeNull()
        }
    }

    companion object {
        private const val EXACT_URL = "https://First.com"
        private const val FUZZY_URL = "https://Fristt.com"
        private const val NON_MATCHING_URL = "1337"
        private const val TITLE = "title"
    }
}