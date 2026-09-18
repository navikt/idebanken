import { NextResponse } from 'next/server'
import { isValidEmail } from '~/utils/isValidEmail'

/**
 * Sjekker om en e-postadresse allerede er abonnent i Make.
 * Fail-open: ved feil returneres subscribed=false slik at nye påmeldinger ikke blokkeres.
 * E-postadressen logges aldri (PII) — kun statuskoder.
 */
export async function POST(req: Request) {
    let email: string | undefined
    try {
        const body = await req.json()
        email = typeof body?.email === 'string' ? body.email.trim() : undefined
    } catch {
        /* ugyldig JSON håndteres under */
    }

    if (!email || !isValidEmail(email)) {
        return NextResponse.json({ error: 'Ugyldig e-postadresse' }, { status: 400 })
    }

    const { MAKE_API, MAKE_API_USER, MAKE_API_KEY } = process.env
    if (!MAKE_API || !MAKE_API_USER || !MAKE_API_KEY) {
        console.error(
            'newsletter-status: Mangler Make-konfigurasjon (MAKE_API/MAKE_API_USER/MAKE_API_KEY)'
        )
        return NextResponse.json({ subscribed: false })
    }

    try {
        const res = await fetch(`${MAKE_API}/api/public/v2/subscribers/by_email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${Buffer.from(`${MAKE_API_USER}:${MAKE_API_KEY}`).toString('base64')}`,
            },
            body: JSON.stringify({ email }),
            cache: 'no-store',
        })

        if (res.status === 200) return NextResponse.json({ subscribed: true })
        if (res.status === 404) return NextResponse.json({ subscribed: false })

        console.error(`newsletter-status: Uventet svar fra Make: HTTP ${res.status}`)
        return NextResponse.json({ subscribed: false })
    } catch (error) {
        console.error('newsletter-status: Kall mot Make feilet:', error)
        return NextResponse.json({ subscribed: false })
    }
}
