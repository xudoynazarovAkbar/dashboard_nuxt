import { users } from '#server/data/users'

export default defineEventHandler((event) => {
  return users
    .filter((user) => user.role === 'admin')
    .map((user) => ({
      id: user.id,
      username: user.username,
      role: user.role,
    }))
})
