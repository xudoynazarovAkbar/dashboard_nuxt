import { users } from '#server/data/users'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body

  const user = users.find((u) => u.username === username && u.password === password)

  if (!user) {
    return { success: false, message: 'Invalid credentials' }
  }

  setCookie(event, 'auth_user', user.id, { httpOnly: true, sameSite: 'lax' })

  return { success: true, user: { id: user.id, username: user.username, role: user.role } }
})