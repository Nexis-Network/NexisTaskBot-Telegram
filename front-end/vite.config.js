import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: './',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        emptyOutDir: true,
        sourcemap: false
    },
    server: {
        proxy: {
            "/api": {
                target: process.env.VITE_API_URL || 'http://localhost:3000',
                changeOrigin: true,
                secure: false
            }
        }
    }
});