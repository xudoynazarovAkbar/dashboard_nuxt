import type { User } from '#shared/types/models'
import type {  MeResponse, AuthActionResponse} from '#shared/types/api-responses'
import { computed } from 'vue'

export const useAuth = () => {
  const user = useState<null | User>('auth_user', () => null)

  const isLoggedIn = computed(() => !!user.value)

  const fetchUser = async (): Promise<boolean> => {
    const headers = useRequestHeaders(['cookie'])
    const res = await $fetch<MeResponse>('/api/me', { headers })

    if (!res.authenticated) {
      user.value = null
      return false
    }

    user.value = res.user ?? null
    return true
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await $fetch<AuthActionResponse>('/api/auth/login', {
        method: 'POST',
        body: { email, password },
      })

      if (res.success && res.user) {
        user.value = res.user
        return true
      }

      return false
    } catch {
      return false
    }
  }

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: Role,
  ): Promise<boolean> => {
    try {
      const res = await $fetch<AuthActionResponse>('/api/auth/register', {
        method: 'POST',
        body: { firstName, lastName, email, password, role },
      })

      if (res.success && res.user) {
        user.value = res.user
        return true
      }

      return false
    } catch {
      return false
    }
  }

  const logout = async (): Promise<void> => {
    user.value = null
    try {
      await $fetch('/api/auth/logout', { method: 'POST' })
    } catch {
      alert('Error happenned')
    }
    await navigateTo('/auth')
  }

  return {
    user,
    isLoggedIn,
    fetchUser,
    login,
    register,
    logout,
  }
}