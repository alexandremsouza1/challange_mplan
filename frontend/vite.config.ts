import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  base: '/challange_mplan/',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
