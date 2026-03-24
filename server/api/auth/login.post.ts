import { users } from '#server/data/users'
import type { AuthActionResponse } from '#shared/types/api-responses'

export default defineEventHandler(async (event): Promise<AuthActionResponse> => {
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email and password are required' })
  }

  const user = users.find((u) => u.email === email && u.password === password)

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  setCookie(event, 'auth_user', user.id, { httpOnly: true, sameSite: 'lax' })

  return {
    success: true,
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
  }
})