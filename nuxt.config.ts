// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
	
  vue: {
    propsDestructure: true,
  },

  vite: {
    plugins: [tailwindcss() as any],
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'My Nuxt App',
      meta: [{ name: 'description', content: 'My awesome Nuxt app' }],
      link: [{ rel: 'icon', type: 'image/png', href: '/logo.png' }],
    },
  },

  modules: ['@nuxt/image', '@nuxtjs/i18n'],

  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'uz', name: 'Uzbek', file: 'uz.json' },
    ],
  },
})
