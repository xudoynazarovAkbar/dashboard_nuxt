import { users } from '#server/data/users'

export default defineEventHandler((event) => {
  return users
    .filter((user) => user.role === ROLES.ADMIN)
    .map((user) => ({
      id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
      email: user.email,
      role: user.role,
    }))
})
