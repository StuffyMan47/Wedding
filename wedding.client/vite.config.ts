import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';

//const target = `http://185.178.46.58:5010`;

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        port: 5173
    }
})