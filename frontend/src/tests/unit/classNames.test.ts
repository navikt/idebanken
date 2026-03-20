import { describe, expect, it } from 'vitest'
import { alignmentClassNames } from '~/utils/classNames'

describe('alignmentClassNames', () => {
    it('returns empty string when no alignment is given', () => {
        expect(alignmentClassNames()).toBe('')
    })

    it('adds "flex" and "justify-center text-center" for xAlignment=center', () => {
        const result = alignmentClassNames('center')
        expect(result).toContain('flex')
        expect(result).toContain('justify-center')
        expect(result).toContain('text-center')
    })

    it('adds "flex" and "justify-end text-right" for xAlignment=right', () => {
        const result = alignmentClassNames('right')
        expect(result).toContain('flex')
        expect(result).toContain('justify-end')
        expect(result).toContain('text-right')
    })

    it('adds "flex" and "items-center" for yAlignment=center', () => {
        const result = alignmentClassNames(undefined, 'center')
        expect(result).toContain('flex')
        expect(result).toContain('items-center')
    })

    it('adds "flex" and "items-end" for yAlignment=bottom', () => {
        const result = alignmentClassNames(undefined, 'bottom')
        expect(result).toContain('flex')
        expect(result).toContain('items-end')
    })

    it('combines x and y alignment classes', () => {
        const result = alignmentClassNames('center', 'bottom')
        expect(result).toContain('flex')
        expect(result).toContain('justify-center')
        expect(result).toContain('items-end')
    })
})
