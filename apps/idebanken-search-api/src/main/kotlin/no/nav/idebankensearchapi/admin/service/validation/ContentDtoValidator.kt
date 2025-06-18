package no.nav.idebankensearchapi.admin.service.validation

import no.nav.idebankensearchapi.admin.dto.inbound.ContentDto
import no.nav.idebankensearchapi.admin.exception.MissingIdException
import no.nav.idebankensearchapi.admin.utils.enumContains
import no.nav.idebankensearchapi.admin.utils.enumDescriptors
import no.nav.navnosearchadminapi.common.constants.HREF
import no.nav.navnosearchadminapi.common.constants.ID
import no.nav.navnosearchadminapi.common.constants.INGRESS
import no.nav.navnosearchadminapi.common.constants.METADATA
import no.nav.navnosearchadminapi.common.constants.METADATA_AUDIENCE
import no.nav.navnosearchadminapi.common.constants.METADATA_CREATED_AT
import no.nav.navnosearchadminapi.common.constants.METADATA_LANGUAGE
import no.nav.navnosearchadminapi.common.constants.METADATA_LAST_UPDATED
import no.nav.navnosearchadminapi.common.constants.METADATA_METATAGS
import no.nav.navnosearchadminapi.common.constants.METADATA_TYPE
import no.nav.navnosearchadminapi.common.constants.TEXT
import no.nav.navnosearchadminapi.common.constants.TITLE
import no.nav.navnosearchadminapi.common.enums.DescriptorProvider
import no.nav.navnosearchadminapi.common.enums.ValidAudiences
import no.nav.navnosearchadminapi.common.enums.ValidMetatags
import no.nav.navnosearchadminapi.common.enums.ValidTypes
import org.springframework.stereotype.Component

@Component
class ContentDtoValidator() {

    fun validate(content: List<ContentDto>): Map<String, List<String>> {
        return buildMap {
            content.forEach {
                validate(it).let { validationErrors ->
                    if (validationErrors.isNotEmpty()) put(it.id ?: throw MissingIdException(), validationErrors)
                }
            }
        }
    }

    private fun validate(content: ContentDto): List<String> {
        return buildList {
            addAll(validateNotNull(requiredFieldsMap(content)))

            content.metadata?.type?.let { type -> addAll(validateType(type)) }
            content.metadata?.audience?.let { audience -> addAll(validateAudience(audience)) }
            content.metadata?.metatags?.let { metatags -> addAll(validateMetatags(metatags)) }
        }
    }

    private fun requiredFieldsMap(content: ContentDto): Map<String, Any?> {
        return mapOf(
            ID to content.id,
            HREF to content.href,
            TITLE to content.title,
            INGRESS to content.ingress,
            TEXT to content.text,
            METADATA to content.metadata,
            METADATA_CREATED_AT to content.metadata?.createdAt,
            METADATA_LAST_UPDATED to content.metadata?.lastUpdated,
            METADATA_AUDIENCE to content.metadata?.audience,
            METADATA_LANGUAGE to content.metadata?.language,
        )
    }

    private fun validateNotNull(fields: Map<String, Any?>): List<String> {
        return fields.entries.filter { it.value == null }.map { "Påkrevd felt mangler: ${it.key}" }
    }

    private fun validateType(type: String): List<String> {
        return listOfNotNull(validateValueIsValid<ValidTypes>(type, METADATA_TYPE))
    }

    private fun validateAudience(audience: List<String>): List<String> {
        return audience.mapNotNull { validateValueIsValid<ValidAudiences>(it, METADATA_AUDIENCE) }
    }

    private fun validateMetatags(metatags: List<String>): List<String> {
        return metatags.mapNotNull { validateValueIsValid<ValidMetatags>(it, METADATA_METATAGS) }
    }

    private inline fun <reified T> validateValueIsValid(
        value: String,
        fieldName: String
    ): String? where T : Enum<T>, T : DescriptorProvider {
        return if (!enumContains<T>(value)) {
            "Ugyldig verdi for $fieldName: $value. Gyldige verdier: ${enumDescriptors<T>()}"
        } else null
    }
}