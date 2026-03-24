import type { Role } from '#shared/types/roles'

export interface NavItem {
  labelKey: string
  path: string
  roles: Role[]
}

export const NAV_ITEMS: NavItem[] = [
  {
    labelKey: 'navigation.home',
    path: '/',
    roles: [ROLES.USER, ROLES.ADMIN, ROLES.DIRECTOR],
  },
  {
    labelKey: 'navigation.posts',
    path: '/posts',
    roles: [ROLES.USER, ROLES.ADMIN, ROLES.DIRECTOR],
  },
  {
    labelKey: 'navigation.createPost',
    path: '/create-post',
    roles: [ROLES.ADMIN, ROLES.DIRECTOR],
  },
  {
    labelKey: 'navigation.manageAdmins',
    path: '/manage-admins',
    roles: [ROLES.DIRECTOR],
  },
	{
		labelKey: 'navigation.restaurants',
		path: '/restaurants',
		roles: [ROLES.USER, ROLES.ADMIN, ROLES.DIRECTOR]
	},
	{
		labelKey: 'navigation.cart',
		path: '/cart',
		roles: [ROLES.USER, ROLES.ADMIN, ROLES.DIRECTOR]
	}
]
