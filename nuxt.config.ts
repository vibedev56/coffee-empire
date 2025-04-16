import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt'
  ],

  typescript: {
    strict: true,
    shim: false,
  },

  alias: {
    '@entities': '/entities',
    '@features': '/features',
    '@widgets': '/widgets',
    '@shared': '/shared',
  },

  nitro: {
    preset: 'netlify',
  },

  routeRules: {
    '/': { redirect: '/login' },
  },

  compatibilityDate: '2025-04-16',
})