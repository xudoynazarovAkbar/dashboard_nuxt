import type { User } from '#shared/types/models'

export type MeResponse =
  | { authenticated: true; user: User }
  | { authenticated: false; user?: never }

export type AuthActionResponse =
  | { success: true; user: User }
  | { success: false; message: string }