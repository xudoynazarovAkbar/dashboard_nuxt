export const useRestaurants = () => {
	const { $api } = useNuxtApp()
  const { data, status, error, refresh } = useAsyncData<RestaurantsResponse>(
    'restaurants',
    () => $api('/restaurant')
  )

  const restaurants = computed(() =>
    data.value?.ok ? data.value.data.restaurants : []
  )

  const apiError = computed(() =>
    data.value?.ok === false ? data.value.error.message : error.value?.message ?? null
  )

  return {
    restaurants,
    pending: computed(() => status.value === 'pending'),
    error: apiError,
    refresh,
  }
}