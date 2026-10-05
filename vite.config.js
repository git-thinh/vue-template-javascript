import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { resolve } from 'path'
const __dirname = process.cwd().replace(/\\/g, '/');

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'


export default defineConfig({
    
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
    ],
})
