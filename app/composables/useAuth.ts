import type {User} from '#shared/types/models'
import type {LoginResponse, MeResponse} from '#shared/types/api-responses'
import {computed} from 'vue'

export const useAuth = () => {
	const user = useState<null | User>('auth_user', () => null)
	
	const isLoggedIn = computed(() => !!user.value)
	
	const fetchUser = async () => {
		const headers = useRequestHeaders(['cookie'])
		const res = await $fetch<MeResponse>('/api/me', {headers})
		
		if (!res.authenticated) {
			user.value = null
			return false
		}
		
		user.value = res.user ?? null
		return true
	}
	
	const login = async (username: string, password: string) => {
		try {
			const res = await $fetch<LoginResponse>('/api/login', {
				method: 'POST',
				body: {username, password},
			})
			if (res.success && res.user) {
				user.value = res.user
				return true
			} else {
				return false
			}
		} catch (err) {
			return false
		}
	}
	
	const logout = async () => {
		user.value = null
		try {
			await $fetch('/api/logout', {method: 'POST'})
		} catch {
		}
		navigateTo('/auth')
	}
	
	return {
		user,
		isLoggedIn,
		fetchUser,
		login,
		logout,
	}
}
