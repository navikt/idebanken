import type { Options } from '.'
import { globSync } from 'glob'
import { DIR_SRC_ASSETS } from './constants'

export default function buildAssetConfig(): Options {
    const GLOB_EXTENSIONS_ASSETS = '{tsx,ts,jsx,js}'
    const FILES_ASSETS = globSync(`${DIR_SRC_ASSETS}/**/*.${GLOB_EXTENSIONS_ASSETS}`).map((s) =>
        s.replaceAll('\\', '/')
    )
    const prodMode = process.env.NODE_ENV !== 'development'

    return {
        bundle: true, // Needed to bundle @enonic/js-utils and dayjs
        dts: false, // d.ts files are use useless at runtime
        entry: FILES_ASSETS,

        format: [
            // 'cjs', // Legacy browser support
            'esm',
        ],
        minify: prodMode,
        sourcemap: !prodMode,
        platform: 'browser',
        silent: ['QUIET', 'WARN'].includes(process.env.LOG_LEVEL_FROM_GRADLE || ''),
        splitting: true,
        tsconfig: `${DIR_SRC_ASSETS}/tsconfig.json`,
    }
}
