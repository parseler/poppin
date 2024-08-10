import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "팝핀",
        short_name: "팝핀",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        navigateFallback: null,
        runtimeCaching: [
          {
            urlPattern: ({ url }) =>
              !["/oauth2", "/login"].some((path) =>
                url.pathname.startsWith(path)
              ),
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/, // 이미지 파일 패턴
            handler: "NetworkFirst", // 캐시 우선 전략
            options: {
              cacheName: "images", // 캐시 이름
              expiration: {
                maxEntries: 50, // 최대 저장 항목 수
                maxAgeSeconds: 30 * 24 * 60 * 60, // 항목 만료 기간 (30일)
              },
              cacheableResponse: {
                statuses: [0, 200], // 캐시 가능한 응답 상태
              },
            },
          },
          {
            urlPattern: ({ url }) =>
              ["/oauth2", "/login"].some((path) =>
                url.pathname.startsWith(path)
              ),
            handler: "NetworkOnly",
          },
        ],
      },
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    assetsInlineLimit: 0, // 이미지 파일을 인라인하지 않도록 설정
  },
});
