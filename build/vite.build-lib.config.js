// import PATH from 'node:path'
// import fs from 'node:fs'
// import * as fsExtra from "fs-extra";

export default async (root, outputName, entryName) => {
	const outDir = `${root}/dist`;

	//const outDir = `${root}/src/${projectDir}/${projectCode}/static/bak`;
	//if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
	//else fsExtra.emptyDirSync(outDir);

	//const entryFile = `${root}/src/${projectDir}/${projectCode}/runtime/_RTIndex.js`
	//const OUTPUT_NAME = 'rtm.min';

	const entryFile = `${root}/src/${entryName}.js`
	console.log(`\n[ BUILD_LIB = ./dist/${outputName}.js ]\n`);

	const v = {
		minify: false,
		emptyOutDir: false,
		outDir: outDir,
		lib: {
			entry: entryFile, //lib/index.ts
			//formats: ['es', 'umd'],
			formats: ['umd'],
			fileName: `${outputName}.lib`,
			name: outputName //[...umd.js]
		},
		rollupOptions: {
			// Externalize deps that shouldn't be bundled into the library.
			external: ['vue', '@vueuse/core'],
			//external: ['jspdf', 'vue', '@vueuse/core'],
			output: {
				assetFileNames: (assetInfo) => {
					let extType = assetInfo.name.split('.').at(1);
					if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
						extType = 'img';
					} else if (/woff|woff2/i.test(extType)) {
						extType = 'font';
					}
					//return `${extType}/[name]-[hash][extname]`;
					//return `${extType}/[name][extname]`;
					return `[name][extname]`;
				},
				//chunkFileNames: 'js/[name]-[hash].js',
				//entryFileNames: 'js/[name]-[hash].js',
				//chunkFileNames: 'js/[name].js',
				chunkFileNames: `[name].js`,
				entryFileNames: outputName + '.lib.js',

				// Provide global variables to use in the UMD build for externalized deps
				//[...umd.js]
				globals: { vue: 'Vue' },
			},
		},
		sourcemap: false,
		target: 'esnext', // Reduce bloat from legacy polyfills.
	};

	return v;
}
