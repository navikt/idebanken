import type { Plugin } from 'esbuild'
import * as fs from 'fs'
import * as nodePath from 'path'
import { parse } from '@babel/parser'
import traverseDefault from '@babel/traverse'
import generateDefault from '@babel/generator'
import * as t from '@babel/types'

// Handle both CommonJS and ESM exports for babel packages
const traverse =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof traverseDefault === 'function' ? traverseDefault : (traverseDefault as any).default
const generate =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof generateDefault === 'function' ? generateDefault : (generateDefault as any).default

export const loggerInjectPlugin = (): Plugin => ({
    name: 'logger-inject',
    setup(build) {
        build.onLoad({ filter: /\.[jt]s$/ }, async (args) => {
            const source = await fs.promises.readFile(args.path, 'utf8')
            const ast = parse(source, { sourceType: 'module', plugins: ['typescript'] })

            traverse(ast, {
                CallExpression(path) {
                    const callee = path.node.callee
                    if (
                        t.isMemberExpression(callee) &&
                        t.isIdentifier(callee.object, { name: 'logger' })
                    ) {
                        const line = path.node.loc?.start.line.toString() ?? '0'
                        // Ensure at least 5 arguments
                        while (path.node.arguments.length < 5) {
                            path.node.arguments.push(t.identifier('undefined'))
                        }
                        // Inject file and line
                        path.node.arguments[3] = t.stringLiteral(nodePath.basename(args.path))
                        path.node.arguments[4] = t.stringLiteral(line)
                    }
                },
            })

            const output = generate(ast, {}, source)
            return {
                contents: output.code,
                loader: nodePath.extname(args.path).slice(1) as 'js' | 'ts',
            }
        })
    },
})
