import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';

const outDir = resolve(__dirname, '..', 'server', 'dist')

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir,
    emptyOutDir : true,
  }
})
