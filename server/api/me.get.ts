import { users } from '#server/data/users'

export default defineEventHandler((event) => {
  const userId = getCookie(event, 'auth_user')
  if (!userId) return { authenticated: false }

  const user = users.find((u) => u.id === userId)
  if (!user) return { authenticated: false }

  return {
    authenticated: true,
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    }
  }
})
