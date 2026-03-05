import type { Role } from '#shared/types/roles'

export interface User {
  id: string
  username: string
  role: Role
}

export interface Post {
  id: string
  title: string
  body: string
}
