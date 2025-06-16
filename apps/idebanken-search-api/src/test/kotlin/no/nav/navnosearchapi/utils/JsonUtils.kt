package no.nav.navnosearchapi.utils

fun readJsonFile(name: String): String {
    return {}.javaClass.getResource(name)!!.readText()
}
