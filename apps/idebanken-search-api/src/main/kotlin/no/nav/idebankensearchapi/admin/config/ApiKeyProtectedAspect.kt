package no.nav.idebankensearchapi.admin.config

import no.nav.idebankensearchapi.admin.exception.InvalidApiKeyException
import org.aspectj.lang.annotation.Aspect
import org.aspectj.lang.annotation.Before
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import org.springframework.web.context.request.RequestContextHolder
import org.springframework.web.context.request.ServletRequestAttributes

@Aspect
@Component
class HeaderCheckAspect(@Value("\${api-key}") val apiKey: String) {

    @Before("@annotation(apiKeyProtected)")
    fun checkHeader(apiKeyProtected: ApiKeyProtected) {
        val request = (RequestContextHolder.currentRequestAttributes() as ServletRequestAttributes).request

        val actualValue = request.getHeader(API_KEY_HEADER)

        if (actualValue != apiKey) {
            throw InvalidApiKeyException()
        }
    }

    companion object {
        const val API_KEY_HEADER = "api-key"
    }
}