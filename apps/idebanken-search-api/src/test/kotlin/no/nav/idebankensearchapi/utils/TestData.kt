package no.nav.idebankensearchapi.utils

import java.time.LocalDateTime
import java.time.ZoneId
import java.time.ZonedDateTime
import no.nav.idebankensearchapi.admin.dto.inbound.ContentDto
import no.nav.idebankensearchapi.admin.dto.inbound.ContentMetadata
import no.nav.idebankensearchapi.admin.utils.createInternalId
import no.nav.idebankensearchapi.common.model.IBContent
import no.nav.navnosearchadminapi.common.constants.ENGLISH
import no.nav.navnosearchadminapi.common.constants.NORWEGIAN_BOKMAAL
import no.nav.navnosearchadminapi.common.constants.NORWEGIAN_NYNORSK
import no.nav.navnosearchadminapi.common.enums.ValidAudiences
import no.nav.navnosearchadminapi.common.enums.ValidMetatags
import no.nav.navnosearchadminapi.common.enums.ValidTypes

const val TEAM_NAME = "test-team"
const val HINDI = "hi"


val fixedNow: ZonedDateTime = ZonedDateTime.of(
    LocalDateTime.of(2020, 1, 1, 12, 0),
    ZoneId.of("Europe/Oslo")
)
val fixedNowMinusTwoYears: ZonedDateTime = fixedNow.minusYears(2)
val fixedNowMinus10Days: ZonedDateTime = fixedNow.minusDays(10)
val fixedNowMinus50Days: ZonedDateTime = fixedNow.minusDays(50)

val initialAdminTestData = listOf(
    dummyContent(
        externalId = "1",
        audience = listOf(
            ValidAudiences.PERSON.descriptor,
            ValidAudiences.EMPLOYER.descriptor,
            ValidAudiences.PROVIDER.descriptor
        ),
        metatags = listOf(ValidMetatags.STATISTIKK.descriptor)
    ),
    dummyContent(
        externalId = "2",
        metatags = listOf(ValidMetatags.STATISTIKK.descriptor)
    ),
    dummyContent(
        externalId = "3",
        timestamp = fixedNowMinusTwoYears,
        metatags = listOf(ValidMetatags.STATISTIKK.descriptor)
    ),
    dummyContent(
        externalId = "4",
        timestamp = fixedNowMinusTwoYears,
        language = ENGLISH
    ),
    dummyContent(
        externalId = "5",
        timestamp = fixedNowMinus10Days,
        audience = listOf(ValidAudiences.EMPLOYER.descriptor),
        language = ENGLISH,
    ),
    dummyContent(
        externalId = "6",
        timestamp = fixedNowMinus10Days,
        audience = listOf(ValidAudiences.EMPLOYER.descriptor),
        language = ENGLISH,
    ),
    dummyContent(
        externalId = "7",
        timestamp = fixedNowMinus50Days,
        audience = listOf(ValidAudiences.EMPLOYER.descriptor),
        language = HINDI,
    ),
    dummyContent(
        externalId = "8",
        timestamp = fixedNowMinus50Days,
        audience = listOf(ValidAudiences.PROVIDER.descriptor),
        language = HINDI,
    ),
    dummyContent(
        externalId = "9",
        timestamp = fixedNowMinus50Days,
        audience = listOf(ValidAudiences.PROVIDER.descriptor),
        language = HINDI,
    ),
    dummyContent(
        externalId = "10",
        timestamp = fixedNowMinus50Days,
        audience = listOf(ValidAudiences.PROVIDER.descriptor),
        language = HINDI,
    ),
)

fun dummyContent(
    teamName: String = TEAM_NAME,
    externalId: String = "123",
    timestamp: ZonedDateTime = fixedNow,
    audience: List<String> = listOf(ValidAudiences.PERSON.descriptor),
    language: String = NORWEGIAN_BOKMAAL,
    metatags: List<String> = emptyList()
) = IBContent.from(
    id = createInternalId(teamName, externalId),
    teamOwnedBy = teamName,
    href = "https://www.href.com",
    title = "title",
    ingress = "ingress",
    text = "text",
    type = ValidTypes.ANDRE.descriptor,
    createdAt = timestamp,
    lastUpdated = timestamp,
    sortByDate = timestamp,
    audience = audience,
    language = language,
    metatags = metatags,
    languageRefs = listOf(NORWEGIAN_NYNORSK, ENGLISH),
    includeTypeInAllText = false,
    contentType = "contentType",
    categories = listOf("category1", "category2"),
)

fun dummyContentDto(
    id: String? = "11",
    href: String? = "https://eleventh.com",
    title: String? = "Eleventh title",
    ingress: String? = "Eleventh ingress",
    text: String? = "Eleventh text",
    type: String = ValidTypes.ANDRE.descriptor,
    createdAt: ZonedDateTime? = fixedNow,
    lastUpdated: ZonedDateTime? = fixedNow,
    audience: List<String>? = listOf(ValidAudiences.PROVIDER.descriptor),
    language: String? = ENGLISH,
    metatags: List<String> = listOf(ValidMetatags.INFORMASJON.descriptor),
    languageRefs: List<String> = listOf(NORWEGIAN_BOKMAAL),
) = ContentDto(
    id = id,
    href = href,
    title = title,
    ingress = ingress,
    text = text,
    metadata = ContentMetadata(
        type = type,
        createdAt = createdAt,
        lastUpdated = lastUpdated,
        audience = audience,
        language = language,
        metatags = metatags,
        languageRefs = languageRefs,
    )
)
