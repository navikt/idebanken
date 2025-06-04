import type { Options } from '.'
import { globSync } from 'glob'
import { DIR_SRC, DIR_SRC_ASSETS, DIR_SRC_STATIC } from './constants'

export default function buildServerConfig(): Options {
    const GLOB_EXTENSIONS_SERVER = '{ts,js}'
    const FILES_SERVER = globSync(`${DIR_SRC}/**/*.${GLOB_EXTENSIONS_SERVER}`, {
        absolute: false,
        ignore: globSync(`${DIR_SRC_ASSETS}/**/*.${GLOB_EXTENSIONS_SERVER}`).concat(
            globSync(`${DIR_SRC_STATIC}/**/*.${GLOB_EXTENSIONS_SERVER}`)
        ),
    }).map((s) => s.replaceAll('\\', '/'))

    return {
        bundle: true, // Needed to bundle @enonic/js-utils
        dts: false, // d.ts files are use useless at runtime
        entry: FILES_SERVER,
        env: {
            BROWSER_SYNC_PORT: '3100',
        },
        esbuildOptions(options, _context) {
            // If you have libs with chunks, use this to avoid collisions
            options.chunkNames = '_chunks/[name]-[hash]'

            options.mainFields = ['module', 'main']
        },
        external: ['/lib/enonic/static', '/lib/thymeleaf', /^\/lib\/xp\//],
        format: 'cjs',

        minify: false, // Minifying server files makes debugging harder

        platform: 'neutral',
        silent: ['QUIET', 'WARN'].includes(process.env.LOG_LEVEL_FROM_GRADLE || ''),
        shims: false, // https://tsup.egoist.dev/#inject-cjs-and-esm-shims
        splitting: true,
        sourcemap: false,
        target: 'es5',
    }
}
