// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: ["@nuxt/ui", "@nuxt/image", "@pinia/nuxt"],
  css: ["~/assets/css/main.css"],

  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/app_logo.png",
        },
      ],
    },
  },

  image: {
    cloudinary: {
      baseURL: `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/fetch`,
    },
  },

  // runtimeConfig: {
  //   public: {
  //     BASE_URL: process.env.BASE_URL,
  //     MAPTILER_API_KEY: process.env.MAPTILER_API_KEY,
  //   },
  // },
});
