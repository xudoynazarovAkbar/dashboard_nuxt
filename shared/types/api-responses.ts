import type { User } from '#shared/types/models'

export interface MeResponse {
  authenticated: boolean
  user?: User
}

export interface LoginResponse {
  success: boolean
  user?: User
}
