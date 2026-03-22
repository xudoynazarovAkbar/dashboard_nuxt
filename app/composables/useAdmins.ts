import type { User } from '#shared/types/models'

export const useAdmins = () => {
  const { data: admins } = useNuxtData<Omit<User, 'password'>[]>('admins')

  const refresh = () => refreshNuxtData('admins')

  const optimisticDelete = async (id: string) => {
    const previous = [...(admins.value ?? [])]
    admins.value = admins.value?.filter(a => a.id !== id) ?? []
    try {
      await $fetch(`/api/admins/${id}`, { method: 'DELETE' })
    } catch {
      admins.value = previous
    } finally {
      await refresh()
    }
  }

  const optimisticCreate = async (values: Omit<User, 'password' | 'id'>) => {
    const previous = [...(admins.value ?? [])]
    admins.value = [{ ...values, id: 'temp' }, ...(admins.value ?? [])]
    try {
      await $fetch('/api/auth/register', { method: 'POST', body: values })
    } catch {
      admins.value = previous
    } finally {
      await refresh()
    }
  }

  return { admins, refresh, optimisticDelete, optimisticCreate }
}