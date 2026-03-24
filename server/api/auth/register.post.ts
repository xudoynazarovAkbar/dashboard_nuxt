import { users } from '#server/data/users'
import { v4 as uuid } from 'uuid'
import type { AuthActionResponse } from '#shared/types/api-responses'

export default defineEventHandler(async (event): Promise<AuthActionResponse> => {
  const body = await readBody(event)
  const { firstName, lastName, email, password, role } = body

  if (!firstName || !lastName || !email || !password || !Object.values(ROLES).includes(role)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'firstName, lastName, email, password and a valid role are required',
    })
  }

  const existingUser = users.find((u) => u.email === email)
  if (existingUser) {
    throw createError({ statusCode: 409, statusMessage: 'A user with this email already exists' })
  }

  const newUser = { id: uuid(), firstName, lastName, email, password, role }
  users.push(newUser)

  setCookie(event, 'auth_user', newUser.id, { httpOnly: true, sameSite: 'lax' })

  return {
    success: true,
    user: {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      role: newUser.role,
    },
  }
})
