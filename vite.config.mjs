// Plugins
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Fonts from 'unplugin-fonts/vite'
import Layouts from 'vite-plugin-vue-layouts'
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { VitePluginRadar } from 'vite-plugin-radar' // google分析的代碼引用進來(套件)
import { VitePWA } from 'vite-plugin-pwa' // PWA網頁

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  // 應用程式在服務器上的基本 URL 路徑
  base: './',
  plugins: [
    // vite 自動生成 PWA 所需的各種檔案和設定，
    VitePWA({
      // 怎麼去註冊service worker : 設定快取自動更新
      registerType: 'autoUpdate',
      // 設定 workbox 如何自動產生 service worker
      workbox: {
        // 清除過期的快取，更新四五個版本卻還留第一版，就把它清掉
        cleanupOutdatedCaches: true,
        // 快取的檔案路徑(要快取的檔案有哪些)
        globPatterns: [ // 類似正則表達式
          // 任意資料夾內符合副檔名的任意檔案 woff,eot,woff2、TTF 字型格式、ico圖示檔案格式、
          '**/*.{html,css,js,jpg,png,svg,gif,woff,eot,woff2,ico,ttf}**'
        ],
        // 忽略網址參數，預設不會快取有網址參數的檔案或頁面
        ignoreURLParametersMatching: [/.*/]
      },
      // 定義應用程式的各種屬性
      manifest: {
        // 全名
        name: '番茄鐘',
        // 簡短的名字(桌面顯示)
        short_name: '番茄鐘',
        // 工具列顏色
        theme_color: '#ffa7a7',
        // 啟動畫面背景色
        background_color: '#ffa7a7',
        // 啟動網址
        start_url: './',
        // PWA 範圍，超出範圍會用瀏覽器顯示
        scope: './',
        // 顯示方式，看起來像獨立的應用程式
        // minimal-ui 精簡UI，會有上一頁下一頁
        display: 'standalone',
        // 產生各種尺寸的icon
        icons: [
          {
            src: './android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: './android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),
    VitePluginRadar({
      analytics: {
        id: 'G-EP7N8FWQZ9'
      }
    }),
    VueRouter(),
    Layouts(),
    Vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss'
      }
    }),
    Components(),
    Fonts({
      google: {
        families: [{
          name: 'Roboto',
          styles: 'wght@100;300;400;500;700;900'
        }]
      }
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router'
      ],
      eslintrc: {
        enabled: true
      },
      vueTemplate: true
    })
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue'
    ]
  },
  server: {
    port: 3000
  }
})
