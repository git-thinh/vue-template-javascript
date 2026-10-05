import { createApp } from 'vue'
//import { initializeAppData } from '../_init/initData'

import App from './App.vue'
import './style.css'

export async function initApp(element, option) {
    const target = typeof element === 'string'
        ? document.querySelector(element) : element

    if (!target) { throw new Error('[MascotDLL] mount element not found') }

    //await initializeAppData(option)

    const app = createApp(App)
    app.mount(target)

    return {
        app,
        destroy() { app.unmount() },
    }
}