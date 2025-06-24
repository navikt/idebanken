package no.nav.idebankensearchapi.admin.utils

import no.nav.navnosearchadminapi.common.enums.DescriptorProvider

inline fun <reified T> enumContains(name: String): Boolean where T : Enum<T>, T : DescriptorProvider {
    return enumValues<T>().any { it.descriptor == name }
}

inline fun <reified T> enumDescriptors(): List<String> where T : Enum<T>, T : DescriptorProvider {
    return enumValues<T>().map { it.descriptor }
}