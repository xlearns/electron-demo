import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { devElectronPlugin, getReplacer } from './plugins/devElectronPlugin'
import { buildElectronPlugin } from './plugins/buildElectronPlugin'
import optimizer from "vite-plugin-optimizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [optimizer(getReplacer()),devElectronPlugin(), vue()],
  build: {
    rollupOptions: {
        plugins: [buildElectronPlugin()],
    },
},
})
