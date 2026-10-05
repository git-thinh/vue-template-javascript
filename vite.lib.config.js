import path, { resolve } from 'path'
import fs from 'fs'
const __dirname = process.cwd().replace(/\\/g, '/');

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

const fileName = 'distributor-locator.lib.js'

function buildCompletePlugin() {
    return {
        name: 'build-complete',

        closeBundle() {
            const file = path
                .join(process.cwd(), 'dist', fileName)
                .replace(/\\/g, '/')
            let js = fs.readFileSync(file, 'utf8')
            const time = new Date().toISOString().replace(/T/g, " - ")
            js = //import.meta.client
                `console.log('[ MascotDLL ] version - ${time}')\n\n` +
                `window.import = window.import || {};\n` +
                `window.import.meta = window.import.meta || {};\n` +
                `window.import.meta.client = true;\n` +
                `window.process = window.process || {};\n` +
                `window.process.env = window.process.env || {};\n\n` +
                js

            fs.writeFileSync(file, js, 'utf8')

            console.log(`\n\n------------------------`)
            console.log(`✅ TIME = ${time}`)
            console.log('✅ Done build completed!')
            console.log(`📦 Output: dist/${fileName}`)
            console.log(`------------------------\n\n`)
        },
    }
}

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, 'app'),
            '~': resolve(__dirname, 'app'),

            '~~': resolve(__dirname),
            '@@': resolve(__dirname),

            '#app': resolve(__dirname, 'src/shims/app.ts'),
            '#imports': resolve(__dirname, 'src/shims/imports.ts'),
        },
    },
    plugins: [
        vue(),
        /**
         * auto-import
         *
         * Vue:
         *   ref()
         *   computed()
         *   onMounted()
         *   watch()
         *   ...
         *
         * app/composables:
         *   useDistributor()
         *   useMap()
         *   useAppContext()
         *
         * app/utils:
         *   transliterate()
         *   langKey()
         */
        AutoImport({
            imports: ['vue'],
            dirs: [
                resolve(__dirname, 'src/composables'),
                resolve(__dirname, 'src/utils'),
                // standalone replacements cho Nuxt APIs
                resolve(__dirname, 'src/shims'),
            ],
            vueTemplate: true,
            dts: resolve(__dirname, 'src/auto-imports.d.ts'),
        }),
        /* component auto-import */
        Components({
            dirs: [resolve(__dirname, 'src/components')],
            extensions: ['vue'],
            deep: true,
            dts: resolve(__dirname, 'src/components.d.ts'),
        }),

        cssInjectedByJsPlugin(),
        buildCompletePlugin(),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/entry.lib.js'),
            name: 'MascotDLL',
            formats: ['iife'],
            fileName: () => fileName,
        },
        cssCodeSplit: false,
        rollupOptions: {
            output: { inlineDynamicImports: true },
        },
    },
})