const INGRESS_MAX_LENGTH = 500

const withoutTable = (text: string) => text.split('<table')[0]

export const buildSearchDocumentIngress = (ingressTextRaw?: string | null) => {
    return ingressTextRaw ? withoutTable(ingressTextRaw).slice(0, INGRESS_MAX_LENGTH) : ''
}
