import type { Role } from '#shared/types/roles'

export const canManagePosts = (role?: Role) => role === ROLES.ADMIN || role === ROLES.DIRECTOR

export const canManageAdmins = (role?: Role) => role === ROLES.DIRECTOR
