import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'
import { transformShortVmodel } from '@vue-macros/short-vmodel'
import { defineNuxtConfig } from 'nuxt/config'

function resolveLocalePath(extension: string): string {
  return resolve(
    dirname(fileURLToPath(import.meta.url)),
    `./locales/*.${extension}`,
  )
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Budget Calculator',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  // add folders here to auto-import them in your application
  imports: { dirs: ['stores'] },

  components: [{ path: '~/components', pathPrefix: false }],

  // uncomment to disable SSR. This will basically make the app a SPA, like a normal Vue app, but with all the Nuxt goodies
  ssr: false,

  // uncomment to disable the SPA loading animation.
  spaLoadingTemplate: false,

  // global CSS files
  css: ['~/assets/normalize.css', '~/assets/main.css'],

  // plugin configurations
  modules: [
    '@vueuse/nuxt',
    '@vue-macros/nuxt',
    '@unocss/nuxt',
    '@nuxt/image-edge',
    '@nuxt/devtools',
    '@pinia/nuxt',
    'nuxt-typed-router',
    'nuxt-vuefire',
  ],

  vue: {
    compilerOptions: {
      nodeTransforms: [transformShortVmodel({ prefix: '::' })],
    },
    defineModel: true,
  },

  vuefire: {
    config: {
      apiKey: 'AIzaSyDbouwRrqdx6VYk67hktqQ76yHDgxEk-ag',
      authDomain: 'budget-calculator-22413.firebaseapp.com',
      databaseURL: 'https://budget-calculator-22413-default-rtdb.europe-west1.firebasedatabase.app',
      projectId: 'budget-calculator-22413',
      storageBucket: 'budget-calculator-22413.appspot.com',
      messagingSenderId: '868878130529',
      appId: '1:868878130529:web:e2d94cf1f81da24750b920',
    },
    // ensures the auth module is enabled
    auth: true,
  },

  vite: {
    plugins: [
      VueI18nVitePlugin({
        include: [
          resolveLocalePath('yml'),
          resolveLocalePath('yaml'),
          resolveLocalePath('json'),
        ],
      }),
    ],
  },

  macros: {
    /*     exportProps: true,
    reactivityTransform: true, */
  },

  /*   colorMode: {
    preference: 'system',
    fallback: 'light',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'color-scheme',
  }, */
  pinia: {
    autoImports: [
      'defineStore',
      ['defineStore', 'definePiniaStore'],
      'storeToRefs',
    ],
  },

  devtools: {
    enabled: true,
  },
})
