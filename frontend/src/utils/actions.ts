'use server'

export async function newsletterSignup(
    _initialState: Record<string, string | Record<string, string>>,
    formData: FormData
) {
    console.log('formData', formData)
    const response: Record<string, string | Record<string, string>> = {}
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

    console.log('before process env')
    const apsisApi = process.env.APSIS_API
    const apsisApiKey = process.env.APSIS_API_KEY
    if (!apsisApi || !apsisApiKey) {
        throw new Error('APISIS_API and/or APSIS_API_KEY is not defined')
    }

    console.log('Subscribing email to newsletter:', email)
    const res = await fetch(apsisApi, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `basic ${apsisApiKey}`,
        },
        body: JSON.stringify({ Email: email }),
    })

    console.log('response from apsis:', res)
    if (!res.ok) {
        console.error(
            `Failed to subscribe email. Status: ${res.status}, Message: ${await res.text()}`
        )
        response.fetchError = 'Det oppstod en feil. Vennligst prøv igjen senere.'
    }

    response.success = 'true'
    return response
}
