export type Role = typeof ROLES.USER | typeof ROLES.ADMIN | typeof ROLES.DIRECTOR

export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  DIRECTOR: 'director',
} as const
