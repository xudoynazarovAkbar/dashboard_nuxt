import type { Role } from '#shared/types/roles'

export interface NavItem {
  labelKey: string
  path: string
  roles: Role[]
}

export const NAV_ITEMS: NavItem[] = [
  {
    labelKey: 'home',
    path: '/',
    roles: ['user', 'admin', 'director'],
  },
  {
    labelKey: 'posts',
    path: '/posts',
    roles: ['user', 'admin', 'director'],
  },
  {
    labelKey: 'create-post',
    path: '/create-post',
    roles: ['admin', 'director'],
  },
  {
    labelKey: 'manage-admins',
    path: '/manage-admins',
    roles: ['director'],
  },
]
