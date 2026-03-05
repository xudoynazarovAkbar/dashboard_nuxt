import { users } from '#server/data/users'
import { v4 as uuid } from 'uuid'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.username || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Username and password are required',
    })
  }

  users.push({
    id: uuid(),
    username: body.username,
    password: body.password,
    role: 'admin',
  })

  return { success: true }
})
