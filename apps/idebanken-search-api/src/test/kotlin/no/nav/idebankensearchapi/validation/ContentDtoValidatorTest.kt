package no.nav.navnosearchadminapi.validation

import io.kotest.matchers.collections.shouldContainOnly
import io.kotest.matchers.maps.shouldBeEmpty
import io.kotest.matchers.maps.shouldHaveSize
import no.nav.idebankensearchapi.admin.service.validation.ContentDtoValidator
import no.nav.idebankensearchapi.admin.utils.enumDescriptors
import no.nav.idebankensearchapi.utils.dummyContentDto
import no.nav.navnosearchadminapi.common.enums.ValidAudiences
import no.nav.navnosearchadminapi.common.enums.ValidMetatags
import no.nav.navnosearchadminapi.common.enums.ValidTypes
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.junit.jupiter.MockitoExtension

@ExtendWith(MockitoExtension::class)
class ContentDtoValidatorTest() {

    private val invalidValue = "invalidValue"
    private val id = dummyContentDto().id

    private val validator = ContentDtoValidator()

    @Test
    fun `skal ha tom liste av valideringsfeil ved gyldig input`() {
        val content = listOf(dummyContentDto())
        val validationErrors = validator.validate(content)

        validationErrors.shouldBeEmpty()
    }

    @Test
    fun `skal ha tom liste av valideringsfeil ved gyldig input uten audience`() {
        val content = listOf(dummyContentDto(audience = emptyList()))
        val validationErrors = validator.validate(content)

        validationErrors.shouldBeEmpty()
    }

    @Test
    fun `skal ha tom liste av valideringsfeil ved gyldig input uten fylke`() {
        val content = listOf(dummyContentDto(fylke = null))
        val validationErrors = validator.validate(content)

        validationErrors.shouldBeEmpty()
    }

    @Test
    fun `skal returnere valideringsfeil for manglende påkrevd felt`() {
        val content = listOf(dummyContentDto(text = null))
        val validationErrors = validator.validate(content)

        validationErrors shouldHaveSize 1
        validationErrors[id]!!.shouldContainOnly("Påkrevd felt mangler: text")
    }

    @Test
    fun `skal returnere valideringsfeil for ugyldig audience`() {
        val content = listOf(dummyContentDto(audience = listOf(invalidValue)))
        val validationErrors = validator.validate(content)

        validationErrors shouldHaveSize 1
        validationErrors[id]!!.shouldContainOnly("Ugyldig verdi for metadata.audience: $invalidValue. Gyldige verdier: ${enumDescriptors<ValidAudiences>()}")
    }

    @Test
    fun `skal returnere valideringsfeil for ugyldig type`() {
        val content = listOf(dummyContentDto(type = invalidValue))
        val validationErrors = validator.validate(content)

        validationErrors shouldHaveSize 1
        validationErrors[id]!!.shouldContainOnly("Ugyldig verdi for metadata.type: $invalidValue. Gyldige verdier: ${enumDescriptors<ValidTypes>()}")
    }

    @Test
    fun `skal returnere valideringsfeil for ugyldig metatag`() {
        val content = listOf(dummyContentDto(metatags = listOf(invalidValue)))
        val validationErrors = validator.validate(content)

        validationErrors shouldHaveSize 1
        validationErrors[id]!!.shouldContainOnly("Ugyldig verdi for metadata.metatags: $invalidValue. Gyldige verdier: ${enumDescriptors<ValidMetatags>()}")
    }
}