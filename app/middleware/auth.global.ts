export default defineNuxtRouteMiddleware(async (to) => {
  const { user, fetchUser } = useAuth()

  const publicRoutes = ['/auth', '/auth/sign-in', '/auth/sign-up']

  if (publicRoutes.includes(to.path)) return

  if (!user.value) {
    const ok = await fetchUser()
    if (!ok) {
      return navigateTo('/auth')
    }
  }
})