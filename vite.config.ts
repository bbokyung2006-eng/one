import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Vercel 환경 변수(process.env)를 클라이언트 코드에서 사용할 수 있도록 주입
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
  },
});