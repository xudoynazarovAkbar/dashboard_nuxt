import {useStorage} from '@vueuse/core'

export interface CartItem {
  product: ProductType
  quantity: number
}

export interface CartState {
  restaurant: Pick<RestaurantType, 'id' | 'name' | 'slug' | 'logotype'> | null
  items: CartItem[]
}

const emptyCart = (): CartState => ({ restaurant: null, items: [] })

export const useCart = () => {
  const cart = useStorage<CartState>('cart', emptyCart())

  // ── Getters ────────────────────────────────────────────────────────────
  const items = computed(() => cart.value.items)
  const restaurant = computed(() => cart.value.restaurant)
  const totalItems = computed(() => items.value.reduce((s, i) => s + i.quantity, 0))
  const totalPrice = computed(() =>
    items.value.reduce((s, i) => s + i.product.price * i.quantity, 0)
  )
  const isEmpty = computed(() => items.value.length === 0)

  const quantityOf = (productId: number) =>
    items.value.find((i) => i.product.id === productId)?.quantity ?? 0

  const isFromDifferentRestaurant = (restaurantId: number) =>
    !isEmpty.value && cart.value.restaurant?.id !== restaurantId

  // ── Mutations ──────────────────────────────────────────────────────────
  const addItem = (
    product: ProductType,
    quantity: number,
    restaurantInfo: CartState['restaurant']
  ) => {
    const existing = cart.value.items.find((i) => i.product.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      cart.value.items.push({ product, quantity })
    }
    if (!cart.value.restaurant) {
      cart.value.restaurant = restaurantInfo
    }
  }

  const setQuantity = (productId: number, quantity: number) => {
    const item = cart.value.items.find((i) => i.product.id === productId)
    if (!item) return
    if (quantity <= 0) {
      removeItem(productId)
    } else {
      item.quantity = quantity
    }
  }

  const removeItem = (productId: number) => {
    cart.value.items = cart.value.items.filter((i) => i.product.id !== productId)
    if (cart.value.items.length === 0) cart.value.restaurant = null
  }

  const clearCart = () => {
    cart.value = emptyCart()
  }

  const replaceCart = (
    product: ProductType,
    quantity: number,
    restaurantInfo: CartState['restaurant']
  ) => {
    cart.value = emptyCart()
    addItem(product, quantity, restaurantInfo)
  }

  return {
    cart,
    items,
    restaurant,
    totalItems,
    totalPrice,
    isEmpty,
    quantityOf,
    isFromDifferentRestaurant,
    addItem,
    setQuantity,
    removeItem,
    clearCart,
    replaceCart,
  }
}