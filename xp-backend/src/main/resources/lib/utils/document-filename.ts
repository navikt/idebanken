// Må gi samme resultat som frontend/src/utils/documentFilename.ts.
// Enonic XP 7 støtter ikke normalize() og replaceAll(), derfor fjernes aksenter manuelt.
export function toFilename(name: string): string {
    return name
        .toLowerCase()
        .replace(/æ/g, 'ae')
        .replace(/ø/g, 'o')
        .replace(/å/g, 'a')
        .replace(/[àáâãä]/g, 'a')
        .replace(/[èéêë]/g, 'e')
        .replace(/[ìíîï]/g, 'i')
        .replace(/[òóôõö]/g, 'o')
        .replace(/[ùúûü]/g, 'u')
        .replace(/ç/g, 'c')
        .replace(/ñ/g, 'n')
        .replace(/[^a-z0-9.-]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/-\./g, '.')
        .replace(/^-|-$/g, '')
}
