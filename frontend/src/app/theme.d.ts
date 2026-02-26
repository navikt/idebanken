// @ts-ignore
import {} from '@navikt/core/react/types/theme'

declare module '@navikt/ds-react/types/theme' {
    export interface CustomAkselColor {
        'ib-brand-pink': never
        'ib-brand-gray': never
        'ib-brand-dark-blue': never
        'ib-brand-orange': never
        'accent-aksel': never
        'inherit': never // Is not an actual color, but allows us to use 'inherit' as a color value to default to the parent color
    }
}
