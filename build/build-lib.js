import * as dotenv from 'dotenv'
dotenv.config()
const root = process.cwd().replace(/\\/g, '/');

// const code__ = (process.env.CODE || '').trim();
// const codePaths = code__.split(':')[0].split('/');
// const type = code__.indexOf(':') > 0 ? code__.split(':')[1].trim() : 'spa';

// const mode = 'build_rtm'
// //const root = process.cwd();
// const projectCode = codePaths.length === 2 ? codePaths[1] : codePaths[0]
// const projectDir = codePaths.length === 2 ? `${codePaths[0]}` : 'project'
// const projectPath = `${root}/src/${projectDir}/${projectCode}/`
// let domain = '';
// console.log('----------------------------------------------------------------')
// console.log('[ BUILD_RTM ]/////////////////////////////////////////////////////')
// console.log(`[ mode = ${mode} | type = ${type} | code = ${projectDir}/${projectCode} ]\n`);

///////////////////////////////////////////////////////////////////////////

import fs from 'node:fs'
import PATH from 'node:path'
import * as VT from 'vite'

import getConfigVite from './vite.config.js'
import getConfigViteBuildLib from './vite.build-lib.config.js'

(async function () {
	const v = await getConfigVite(root);
	let rtm = {};

	// let name = `/src/project/Sitecore/static/bak/lastest.js`;
	// let file = `${root}/lastest.js`, ok = fs.existsSync(file);
	// let dest = `${root}${name}`
	// console.log(`\t COPY /lastest.js -> ${name}`, ok, '\n')
	// if (ok) fs.copyFileSync(file, dest);

	//file = `../../${projectDir}/${projectCode}/setting/sys.js`;
	//const sys = await (await import(file)).default({});
	//if (sys && sys.build) rtm = sys.build.rtm || {};
	rtm = { 'MascotDLL': 'entry.lib' }

	const a = Object.keys(rtm);
	for (var i = 0; i < a.length; i++) {
		const outputName = a[i];
		const entryName = rtm[outputName];

		console.log(`RTM[ ${i} ]: ${entryName}.js -> ${outputName}.js`);

		v.build = await getConfigViteBuildLib(root, outputName, entryName);
		await VT.build(v);
	}

	//---------------------------------------------------------------------------------------------	
	console.log(`\n[ BUILD_RTM_DONE ]\n`)
})();
