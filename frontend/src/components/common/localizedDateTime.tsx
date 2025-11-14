export function localizedDateTime(date?: string, locale = 'nb-NO') {
    if (!date) return ''
    const formatted = new Date(date).toLocaleDateString(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
    return <time dateTime={date}>{formatted}</time>
}
