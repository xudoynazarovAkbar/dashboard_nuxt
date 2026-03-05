import { NAV_ITEMS } from '~/shared/configs/navigation'
import { useAuth } from '~/composables/useAuth'
import { computed } from 'vue'

export const useNavigation = () => {
  const { user } = useAuth()

  const allowedNavItems = computed(() => {
    const currentUser = user.value
    if (!currentUser) return []

    return NAV_ITEMS.filter((item) => item.roles.includes(currentUser.role))
  })

  return { allowedNavItems }
}
