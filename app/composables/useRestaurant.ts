export const useRestaurant = (slugArg?: string) => {
  const { $api } = useNuxtApp()
  const slug = slugArg ?? (useRoute().params.slug as string)

  const { data, status, error: fetchError } = useAsyncData(
    `restaurant-${slug}`,
    async () => {
      const restaurantsRes = await $api<RestaurantsResponse>('/restaurant')
      if (!restaurantsRes.ok) throw new Error(restaurantsRes.error.message)

      const restaurant = restaurantsRes.data.restaurants.find((r) => r.slug === slug)
      if (!restaurant) throw new Error('Restaurant not found')

      const [categoriesRes, productsRes] = await Promise.all([
        $api<CategoriesResponse>(`/restaurant/category?id=${restaurant.id}`),
        $api<ProductsResponse>(`/restaurant/product?id=${restaurant.id}`),
      ])

      if (!categoriesRes.ok) throw new Error(categoriesRes.error.message)
      if (!productsRes.ok) throw new Error(productsRes.error.message)

      return {
        restaurant,
        categories: categoriesRes.data,
        products: productsRes.data.products,
      }
    }
  )

  const currentRestaurant = computed(() => data.value?.restaurant ?? null)
  const categories = computed(() => data.value?.categories ?? [])
  const products = computed(() => data.value?.products ?? [])
  const pending = computed(() => status.value === 'pending')
  const error = computed(() => fetchError.value?.message ?? null)

  return { currentRestaurant, categories, products, pending, error }
}