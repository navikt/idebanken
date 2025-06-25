package no.nav.idebankensearchapi.integrationtests

import com.github.tomakehurst.wiremock.client.WireMock
import io.kotest.assertions.json.shouldEqualJson
import io.kotest.matchers.booleans.shouldBeFalse
import io.kotest.matchers.booleans.shouldBeTrue
import io.kotest.matchers.shouldBe
import no.nav.idebankensearchapi.admin.utils.createInternalId
import no.nav.idebankensearchapi.utils.TEAM_NAME
import no.nav.idebankensearchapi.utils.dummyContentDto
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity

class AdminIntegrationTest : AbstractAdminIntegrationTest() {

    @BeforeEach
    fun setup() {
        setupIndex()
    }

    @AfterEach
    fun teardown() {
        WireMock.reset()
    }

    @Test
    fun `should fetch content`() {
        val response = get("/content/$TEAM_NAME?page=0")

        response.statusCode shouldBe HttpStatus.OK
        response.body!! shouldEqualJson readFile("/json/fetch-content.json")
    }

    @Test
    fun `should return 401 when fetching content with missing api key`() {
        val response = get("/content/$TEAM_NAME?page=0", headers(isApiKeyValid = false))

        response.statusCode shouldBe HttpStatus.UNAUTHORIZED
        response.body!! shouldEqualJson readFile("/json/fetch-content-invalid-api-key.json")
    }

    @Test
    fun `should return 400 when fetching content with missing request param`() {
        val response: ResponseEntity<String> = get("/content/$TEAM_NAME")

        response.statusCode shouldBe HttpStatus.BAD_REQUEST
        response.body!! shouldEqualJson readFile("/json/fetch-content-missing-page-param.json")
    }

    @Test
    fun `should save content`() {
        val content = dummyContentDto(id = "new id")

        val response = post("/content/$TEAM_NAME", content)

        response.statusCode shouldBe HttpStatus.OK
        response.body!! shouldEqualJson readFile("/json/save-content.json")

        val internalId = createInternalId(TEAM_NAME, content.id!!)
        repository.existsById(internalId).shouldBeTrue()
    }

    @Test
    fun `should return 401 when saving content with missing api key`() {
        val content = dummyContentDto()

        val response = post("/content/$TEAM_NAME", content, headers(isApiKeyValid = false))

        response.statusCode shouldBe HttpStatus.UNAUTHORIZED
        response.body!! shouldEqualJson readFile("/json/save-content-invalid-api-key.json")
    }

    @Test
    fun `should return 400 when saving content with missing id`() {
        val response = post("/content/$TEAM_NAME", dummyContentDto(id = null))

        response.statusCode shouldBe HttpStatus.BAD_REQUEST
        response.body!! shouldEqualJson readFile("/json/save-content-missing-id.json")
    }

    @Test
    fun `should return 200 with validation error when saving content with missing required field`() {
        val response = post("/content/$TEAM_NAME", dummyContentDto(ingress = null))

        response.statusCode shouldBe HttpStatus.OK
        response.body!! shouldEqualJson readFile("/json/save-content-missing-ingress.json")
    }

    @Test
    fun `should delete content`() {
        val deletedId = "1"
        val response = delete("/content/$TEAM_NAME/$deletedId")

        response.statusCode shouldBe HttpStatus.NO_CONTENT

        indexCount() shouldBe 9L
        repository.existsById("$TEAM_NAME-$deletedId").shouldBeFalse()
    }

    @Test
    fun `should return 401 when deleting content with missing api key`() {
        val response = delete("/content/$TEAM_NAME/1", headers(isApiKeyValid = false))

        response.statusCode shouldBe HttpStatus.UNAUTHORIZED
        response.body!! shouldEqualJson readFile("/json/delete-content-invalid-api-key.json")
    }

    @Test
    fun `should return 204 even if team not found`() {
        val teamName = "missing-team"
        val response = delete("/content/$teamName/1")

        response.statusCode shouldBe HttpStatus.NO_CONTENT
    }
}