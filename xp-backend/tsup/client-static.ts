import type { Options } from '.';

import { sassPlugin } from 'esbuild-sass-plugin';

import { globSync } from 'glob';
import {
	DIR_SRC_STATIC
} from './constants';


export default function buildStaticConfig(): Options {
	const GLOB_EXTENSIONS_STATIC = '{tsx,ts,jsx,js}';
	const FILES_STATIC = globSync(`${DIR_SRC_STATIC}/**/*.${GLOB_EXTENSIONS_STATIC}`);
	const prodMode = process.env.NODE_ENV !== 'development';

	const entry = {};
	for (let i = 0; i < FILES_STATIC.length; i++) {
		const element = FILES_STATIC[i];
		entry[element
			.replace(`${DIR_SRC_STATIC}/`, '') // Remove path
			.replace(/\.[^.]+$/, '') // Remove extension
		] = element;
	}

	return {
		bundle: true, // Needed to bundle @enonic/js-utils and dayjs
		dts: false, // d.ts files are use useless at runtime
		entry,

		esbuildPlugins: [/*
			TsupPluginManifest({
				generate: (entries) => {// Executed once per format
					const newEntries = {};
					Object.entries(entries).forEach(([k,v]) => {
						console.log(k,v);
						const ext = v.split('.').pop() as string;
						const parts = k.replace(`${DIR_SRC_STATIC}/`, '').split('.');
						parts.pop();
						parts.push(ext);
						newEntries[parts.join('.')] = v.replace(`${DIR_DST_STATIC}/`, '');
					});
					return newEntries;
				}
			}),*/
			sassPlugin(),
		],

		format: [
			'cjs', // Legacy browser support, also css in manifest.cjs.json
			'esm', // cjs needed because css files are not reported in manifest.esm.json
		],
		minify: prodMode,
		sourcemap: !prodMode,
		platform: 'browser',
		silent: ['QUIET', 'WARN'].includes(process.env.LOG_LEVEL_FROM_GRADLE||''),
		splitting: true,
		tsconfig: `${DIR_SRC_STATIC}/tsconfig.json`,
	};
}
