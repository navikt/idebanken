/**
 * This script replaces all occurrences of the RichText type in the generated TypeScript definitions
 * because the RichText is processed by the Guillotine layer and is available as a string in the frontend.
 *
 * The script is run by graphql-codegen as a post-processing hook step.
 **/

// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs')

const filePath = './src/types/generated.d.ts'
let content = fs.readFileSync(filePath, 'utf8')

// Remove the RichText type definition entirely (optional)
content = content.replace(
	/\/\*\* RichText type\. \*\/[\s\S]*?export type RichText = \{[\s\S]*?\};?\s*/g,
	''
)
// Replace all RichText type references with string
content = content.replace(/\bRichText\b/g, "Scalars['String']['output']")

fs.writeFileSync(filePath, content)
console.log('Replaced all RichText occurrences with string')
