import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            workbox: {
                globPatterns: ['**/*'],
            },
            includeAssets: ['**/*'],
            manifest: {
                name: 'Discord Timestamp Generator',
                description:
                    'With Discord Timestamp Generator, you can generate Discord timestamps in multiple formats and use it on your message/profile bio.',
                theme_color: '#5468ff',
                start_url: '/',
                display: 'standalone',
            },
        }),
    ],
})
