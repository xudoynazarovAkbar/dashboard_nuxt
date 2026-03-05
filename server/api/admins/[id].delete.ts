import { users } from '#server/data/users'

export default defineEventHandler((event) => {
  const id = event.context.params?.id

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User ID is required',
    })
  }

  const index = users.findIndex((u) => u.id === id && u.role === 'admin')

  if (index === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Admin not found',
    })
  }

  users.splice(index, 1)

  return { success: true }
})
