// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/global.css'],
  modules: ["@pinia/nuxt"],
  compatibilityDate: "2025-01-21",
  runtimeConfig: {
    public: {
      baseUrl: process.env.API_URL,
    }
  },
})