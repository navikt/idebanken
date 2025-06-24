package no.nav.idebankensearchapi.search.utils

private const val QUOTE = '"'

fun String.isInQuotes() = startsWith(QUOTE) && endsWith(QUOTE)
