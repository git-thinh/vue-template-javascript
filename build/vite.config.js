//import fs from 'node:fs'
import vuePlugin from '@vitejs/plugin-vue'
//import viteProjectSetting from './viteProjectSetting.js'

export default async (root) => {
	const v = {
		base: '',
		root: root,
		logLevel: 'error', // info | error | silent
		//configFile: configFile,
		resolve: {
			alias: {
				'@': root + '/src',
				// '^': `${root}/src/${projectDir}/${projectCode}`,
				// //'^runtime': path.resolve(__dirname, './src/runtime'),
				// //'^runtimejs': path.resolve(__dirname, './src/runtime/js'),
				// '^runtime': `${root}/src/${projectDir}/${projectCode}/runtime`,
				// '^runtimejs': `${root}/src/${projectDir}/${projectCode}/runtime/js`,
			},
		},
		plugins: [
			vuePlugin(),
			//viteProjectSetting(root, projectDir, projectCode),
		],
		server: {
			middlewareMode: true,
			watch: {
				usePolling: true,
				interval: 100
			},
			hmr: false
		},
		appType: 'custom'
	};
	return v;
}
