/**
 * Enkel e-postvalidering uten regex (unngår ReDoS-sårbarhet).
 * Sjekker: maks lengde, nøyaktig én @, ikke-tomme deler, punktum i domenet.
 */
export function isValidEmail(email: string): boolean {
    if (!email || email.length > 254 || /\s/.test(email)) return false

    const parts = email.split('@')
    if (parts.length !== 2) return false

    const [local, domain] = parts
    if (!local || local.length > 64 || !domain) return false

    const domainParts = domain.split('.')
    return domainParts.length >= 2 && domainParts.every((part) => part.length > 0)
}
