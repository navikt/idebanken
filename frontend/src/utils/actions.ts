'use server'

export async function newsletterSignup(
    _initialState: Record<string, string | Record<string, string>>,
    formData: FormData
) {
    const response: Record<string, string | Record<string, string>> = { success: 'false' }
    if (formData.get('honningkrukke')) {
        console.debug('Bot detected, form submission ignored.')
        return response
    }

    const email = formData.get('email')
    const consent = formData.get('consent')
    response.previousValues = {
        email: typeof email === 'string' ? email : '',
        consent: typeof consent === 'string' ? consent : '',
    }

    if (
        !email ||
        typeof email !== 'string' ||
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
        response.emailError = 'Skriv inn en gyldig e-postadresse'
    }

    if (!consent) {
        response.consentError = 'Du må gi samtykke for å melde deg på'
    }

    if (response.emailError || response.consentError) {
        return response
    }

    const makeApi = process.env.MAKE_API
    const makeBasicAuth = btoa(`${process.env.MAKE_API_USER}:${process.env.MAKE_API_KEY}`)
    const makeSubscriberListId = process.env.MAKE_SUBSCRIBER_LIST_ID
    if (!makeApi || !makeBasicAuth || !makeSubscriberListId) {
        throw new Error('Missing one or more MAKE_API environment variables')
    }

    const res = await fetch(`${makeApi}/subscribers?subscriber_list_id[]=${makeSubscriberListId}`, {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Basic ${makeBasicAuth}`,
        },
        body: JSON.stringify({ email: email }),
    })

    if (!res.ok) {
        console.error(
            `Failed to subscribe email. Status: ${res.status}, Message: ${await res.text()}`
        )
        response.fetchError = 'Det oppstod en feil. Vennligst prøv igjen senere.'
        return response
    }

    response.success = 'true'
    return response
}
