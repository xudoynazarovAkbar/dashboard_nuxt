export default defineNuxtRouteMiddleware(async (to) => {
  const { user, fetchUser } = useAuth()
  
  if (!user.value) {
    const ok = await fetchUser()
    if (!ok && to.path !== '/auth') {
      return navigateTo('/auth')
    }
  }
})