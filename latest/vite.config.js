import { defineConfig } from 'vite'

export default defineConfig({
  base: '/todo-app/',
  root: 'src',
  build: {
    outDir: '../dist'
  }
})