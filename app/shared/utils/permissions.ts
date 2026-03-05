import type { Role } from '#shared/types/roles'

export const canManagePosts = (role?: Role) => role === 'admin' || role === 'director'

export const canManageAdmins = (role?: Role) => role === 'director'
