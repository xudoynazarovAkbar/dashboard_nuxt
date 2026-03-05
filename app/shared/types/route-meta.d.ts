import type { Role } from '#shared/types/roles'

declare module 'vue-router' {
  interface RouteMeta {
    roles?: Role[]
  }
}
