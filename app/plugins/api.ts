export default defineNuxtPlugin(() => {
  const api = $fetch.create({
    baseURL: useRuntimeConfig().public.apiBase,
  })

  return {
    provide: {
      api,
    },
  }
})

declare module '#app' {
  interface NuxtApp {
    $api: typeof $fetch
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $api: typeof $fetch
  }
}