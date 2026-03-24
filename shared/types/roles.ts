export type Role = typeof ROLES[keyof typeof ROLES]

export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  DIRECTOR: 'director',
} as const
