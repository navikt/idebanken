import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
	schema: [
		{
			'http://localhost:8080/admin/site/preview/idebanken/draft': {},
		},
	],
	generates: {
		'./src/types/generated.d.ts': {
			plugins: ['typescript', 'typescript-operations'],
		},
	},
}
export default config
