export default defineNuxtRouteMiddleware((to) => {
  const { user } = useAuth()

  if (!user.value) {
    return navigateTo('/')
  }

  const requiredRoles = to.meta.roles

  if (requiredRoles && !requiredRoles.includes(user.value.role)) {
    return navigateTo('/')
  }
})
