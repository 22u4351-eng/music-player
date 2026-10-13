import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['soundroom.svg'],
            manifest: {
                name: 'Soundroom Offline Music Player',
                short_name: 'Soundroom',
                description: 'Your local music library, ready offline.',
                start_url: './',
                scope: './',
                display: 'standalone',
                orientation: 'portrait',
                background_color: '#101311',
                theme_color: '#101311',
                icons: [
                    {
                        src: 'soundroom.svg',
                        sizes: 'any',
                        type: 'image/svg+xml',
                        purpose: 'any',
                    },
                ],
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
            },
        }),
    ],
    base: './',
    build: {
        outDir: 'dist',
        emptyOutDir: true,
    },
})
