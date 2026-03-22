import type { Role } from '#shared/types/roles'

export interface User {
  id: string
	firstName: string
	lastName: string
  email: string
  role: Role
}

export interface Post {
  id: string
  title: string
  body: string
}
