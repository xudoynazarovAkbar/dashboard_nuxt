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
    roles: [ROLES.USER, ROLES.ADMIN, ROLES.DIRECTOR],
  },
  {
    labelKey: 'posts',
    path: '/posts',
    roles: [ROLES.USER, ROLES.ADMIN, ROLES.DIRECTOR],
  },
  {
    labelKey: 'create-post',
    path: '/create-post',
    roles: [ROLES.ADMIN, ROLES.DIRECTOR],
  },
  {
    labelKey: 'manage-admins',
    path: '/manage-admins',
    roles: [ROLES.DIRECTOR],
  },
]
