<script setup lang="ts">
const {
  items,
  restaurant,
  isEmpty,
  totalPrice,
  totalItems,
  setQuantity,
  clearCart,
  addItem,
  quantityOf,
} = useCart()

// Load the restaurant's full product list so user can add more
const {
  categories,
  products,
  pending: productsPending,
} = useRestaurant(restaurant.value?.slug ?? undefined)

const activeCategory = ref<number | null>(null)

const filteredProducts = computed(() => {
  if (activeCategory.value === null) return products.value
  return products.value
    .map((group) => ({ ...group, products: group.products.filter((p) => p.is_available) }))
    .filter((group) => group.id === activeCategory.value && group.products.length)
})

// Clear confirmation
const showClearModal = ref(false)
const confirmClear = () => {
  clearCart()
  showClearModal.value = false
}

// Add more items from the bottom section (same restaurant, no conflict possible)
const modalProduct = ref<import('#shared/types/models').ProductType | null>(null)
const modalQty = ref(1)
const showAddModal = ref(false)

const openAddModal = (product: import('#shared/types/models').ProductType) => {
  if (!product.is_available) return
  modalProduct.value = product
  modalQty.value = quantityOf(product.id) || 1
  showAddModal.value = true
}

const closeAddModal = () => {
  showAddModal.value = false
  modalProduct.value = null
  modalQty.value = 1
}

const confirmAdd = () => {
  if (!modalProduct.value || !restaurant.value) return
  addItem(modalProduct.value, modalQty.value, restaurant.value)
  closeAddModal()
}
</script>

<template>
  <div class="cart-page">
    <!-- Empty state -->
    <div
      v-if="isEmpty"
      class="empty-state"
    >
      <span class="empty-icon">🛒</span>
      <CustomTitle type="medium">{{ $t('cart.empty.title') }}</CustomTitle>
      <p class="empty-desc">{{ $t('cart.empty.description') }}</p>
      <NuxtLink
        to="/restaurants"
        class="browse-btn"
        >{{ $t('cart.empty.browseButton') }}</NuxtLink
      >
    </div>

    <template v-else>
      <div class="cart-layout">
        <!-- Left column: order items + more products -->
        <div class="cart-main">
          <!-- Restaurant name -->
          <div class="section-header">
            <p class="section-label">{{ $t('cart.orderFrom') }}</p>
            <div class="restaurant-row">
              <div
                v-if="restaurant?.logotype"
                class="restaurant-logo-wrap"
              >
                <NuxtImg
                  class="restaurant-logo"
                  :src="restaurant.logotype"
                  :alt="restaurant.name"
                />
              </div>
              <CustomTitle type="medium">{{ restaurant?.name }}</CustomTitle>
            </div>
          </div>

          <!-- Cart items list -->
          <div class="cart-items">
            <TransitionGroup name="cart-item">
              <div
                v-for="item in items"
                :key="item.product.id"
                class="cart-item"
              >
                <div class="cart-item-image-wrap">
                  <NuxtImg
                    class="cart-item-image"
                    :src="item.product.photo"
                    :alt="item.product.name"
                  />
                </div>
                <div class="cart-item-info">
                  <p class="cart-item-name">{{ item.product.name }}</p>
                  <p class="cart-item-price">
                    {{ item.product.price * item.quantity }}
                    <span class="cart-item-unit"
                      >· {{ item.product.price }} x {{ item.quantity }}</span
                    >
                  </p>
                </div>
                <RestaurantsCounter
                  :model-value="item.quantity"
                  :min="0"
                  @update:modelValue="(val) => setQuantity(item.product.id, val)"
                />
              </div>
            </TransitionGroup>
          </div>

          <!-- Clear cart -->
          <button
            class="clear-btn"
            @click="showClearModal = true"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
            </svg>
            {{ $t('cart.clearCart') }}
          </button>

          <!-- More products section -->
          <div class="more-section">
            <CustomTitle
              type="medium"
              class="more-title"
              >{{ $t('cart.addMore') }}</CustomTitle
            >

            <div
              v-if="productsPending"
              class="skeleton-row"
            >
              <div
                v-for="i in 4"
                :key="i"
                class="pill-skeleton shimmer"
              />
            </div>

            <RestaurantsCategories
              v-else-if="categories.length"
              v-model="activeCategory"
              :categories="categories"
            />

            <RestaurantsProducts
              v-if="filteredProducts.length"
              :groups="filteredProducts"
              :quantity-of="quantityOf"
              @add="openAddModal"
            />
          </div>
        </div>

        <!-- Right aside: order summary -->
        <aside class="cart-aside">
          <div class="aside-card">
            <p class="aside-title">{{ $t('cart.summary.title') }}</p>

            <div class="aside-rows">
              <div class="aside-row">
                <span>{{ $t('cart.summary.products', { count: totalItems }) }}</span>
                <span>{{ totalPrice }}</span>
              </div>
              <div class="aside-row aside-row--delivery">
                <span>{{ $t('cart.summary.delivery') }}</span>
                <span class="delivery-free">{{ $t('cart.summary.free') }}</span>
              </div>
            </div>

            <div class="aside-divider" />

            <div class="aside-total">
              <span>{{ $t('cart.summary.total') }}</span>
              <span class="aside-total-price">{{ totalPrice }}</span>
            </div>

            <button class="checkout-btn">{{ $t('cart.checkout') }}</button>

            <NuxtLink
              :to="`/restaurants/${restaurant?.slug}`"
              class="back-link"
            >
              ← {{ $t('cart.backToRestaurant') }}
            </NuxtLink>
          </div>
        </aside>
      </div>
    </template>

    <!-- Add modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showAddModal && modalProduct"
          class="modal-backdrop"
          @click.self="closeAddModal"
        >
          <div class="modal">
            <button
              class="modal-close"
              @click="closeAddModal"
            >
              ✕
            </button>
            <div class="modal-image-wrap">
              <NuxtImg
                class="modal-image"
                :src="modalProduct.photo"
                :alt="modalProduct.name"
              />
            </div>
            <div class="modal-body">
              <p class="modal-name">{{ modalProduct.name }}</p>
              <p class="modal-desc">{{ modalProduct.description }}</p>
              <div class="modal-price-row">
                <span
                  v-if="modalProduct.price_original > modalProduct.price"
                  class="price-original"
                >
                  {{ modalProduct.price_original }}
                </span>
                <span class="modal-price">{{ modalProduct.price }}</span>
              </div>
              <RestaurantsCounter
                v-model="modalQty"
                :min="1"
              />
              <button
                class="modal-submit"
                @click="confirmAdd"
              >
                {{ $t('cart.modal.addToCart') }} · {{ modalProduct.price * modalQty }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Clear confirmation modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showClearModal"
          class="modal-backdrop"
          @click.self="showClearModal = false"
        >
          <div class="modal modal--conflict">
            <div class="conflict-icon">🗑️</div>
            <p class="conflict-title">{{ $t('cart.clearModal.title') }}</p>
            <p class="conflict-desc">{{ $t('cart.clearModal.description') }}</p>
            <div class="conflict-actions">
              <button
                class="conflict-btn conflict-btn--cancel"
                @click="showClearModal = false"
              >
                {{ $t('cart.clearModal.cancel') }}
              </button>
              <button
                class="conflict-btn conflict-btn--confirm"
                @click="confirmClear"
              >
                {{ $t('cart.clearModal.confirm') }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
.cart-page {
  padding-bottom: 64px;
}

/* ── Empty state ──────────────────────────────── */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 80px 24px;
  text-align: center;
}

.empty-icon {
  font-size: 56px;
}
.empty-desc {
  color: var(--secondary-color);
  font-size: 15px;
}

.browse-btn {
  margin-top: 8px;
  padding: 12px 28px;
  border-radius: 12px;
  background: var(--active);
  color: var(--white);
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.88;
  }
}

/* ── Layout ───────────────────────────────────── */
.cart-layout {
  display: grid;
  grid-template-columns: auto 320px;
  gap: 28px;
  align-items: start;
  min-width: 0;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
}

/* ── Section header ───────────────────────────── */
.section-header {
  margin-bottom: 20px;
}

.section-label {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--secondary-color);
  margin-bottom: 10px;
}

.restaurant-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.restaurant-logo-wrap {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  overflow: hidden;
  border: 1.5px solid var(--greys);
  flex-shrink: 0;
}

.restaurant-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ── Cart items ───────────────────────────────── */
.cart-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px;
  border-radius: 16px;
  border: 1.5px solid var(--greys);
  background: var(--background);
  transition:
    box-shadow 0.2s,
    background 0.2s;

  &:hover {
    box-shadow: 0 4px 16px var(--shadow);
  }
}

.cart-item-image-wrap {
  width: 64px;
  height: 64px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
}

.cart-item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.cart-item-info {
  flex: 1;
  min-width: 0;
}

.cart-item-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cart-item-price {
  font-size: 15px;
  font-weight: 700;
  color: var(--active);
  margin-top: 4px;
}

.cart-item-unit {
  font-size: 13px;
  font-weight: 500;
  color: var(--secondary-color);
}

/* ── Clear button ─────────────────────────────── */
.clear-btn {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 9px 16px;
  border-radius: 10px;
  border: 1.5px solid var(--danger);
  background: transparent;
  color: var(--danger);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 40px;
  transition: background 0.15s;

  &:hover {
    background: rgba(229, 56, 44, 0.06);
  }
}

/* ── Aside ────────────────────────────────────── */
.cart-aside {
  position: sticky;
  top: 20px;
}

.aside-card {
  border: 1.5px solid var(--greys);
  border-radius: 20px;
  background: var(--background);
  padding: 24px;
  display: flex;
  flex-direction: column;
  transition: background 0.2s;
}

.aside-title {
  font-size: 17px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 16px;
}

.aside-rows {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.aside-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: var(--secondary-color);
  font-weight: 500;
}

.delivery-free {
  font-weight: 700;
  color: var(--success, #28a745);
}

.aside-divider {
  height: 1px;
  background: var(--greys);
  margin: 16px 0;
}

.aside-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 16px;
}

.aside-total-price {
  font-size: 20px;
  color: var(--active);
}

.checkout-btn {
  width: 100%;
  padding: 15px;
  border-radius: 14px;
  border: none;
  background: var(--active);
  color: var(--white);
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition:
    opacity 0.15s,
    transform 0.15s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
}

.back-link {
  margin-top: 12px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: var(--secondary-color);
  text-decoration: none;
  transition: color 0.15s;

  &:hover {
    color: var(--active);
  }
}
/* ───────More Section──────────────────────────── */
.more-title {
  margin-bottom: 16px;
}
/* ── Skeletons ────────────────────────────────── */
@keyframes shimmer {
  0% {
    background-position: -600px 0;
  }
  100% {
    background-position: 600px 0;
  }
}

.shimmer {
  border-radius: 16px;
  background: linear-gradient(90deg, var(--color) 25%, var(--greys) 50%, var(--color) 75%);
  background-size: 600px 100%;
  animation: shimmer 1.4s infinite linear;
}

.skeleton-row {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.pill-skeleton {
  height: 38px;
  width: 90px;
  border-radius: 100px;
}

/* ── Cart item transitions ────────────────────── */
.cart-item-enter-active,
.cart-item-leave-active {
  transition: all 0.25s ease;
}

.cart-item-enter-from,
.cart-item-leave-to {
  opacity: 0;
  transform: translateX(-12px);
}

/* ── Modals ───────────────────────────────────── */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;

  @media (min-width: 600px) {
    align-items: center;
  }
}

.modal {
  position: relative;
  width: 100%;
  max-width: 480px;
  background: var(--white);
  border-radius: 24px 24px 0 0;
  overflow: hidden;

  @media (min-width: 600px) {
    border-radius: 24px;
  }
}

.modal-close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.12);
  color: var(--text);
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-image-wrap {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.modal-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-body {
  padding: 20px 20px 28px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.modal-name {
  font-size: 18px;
  font-weight: 700;
}

.modal-desc {
  font-size: 14px;
  color: var(--secondary-color);
}

.modal-price {
  font-size: 20px;
  font-weight: 800;
}

.modal-submit {
  margin-top: 8px;
  width: 100%;
  padding: 15px;
  border-radius: 14px;
  border: none;
  background: var(--active);
  color: var(--white);
  font-weight: 700;
}

/* conflict modal */
.modal--conflict {
  padding: 36px 28px 32px;
  text-align: center;
}

.conflict-actions {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}

.conflict-btn {
  flex: 1;
  padding: 13px;
  border-radius: 12px;
  border: none;
  font-weight: 600;

  &--cancel {
    background: var(--color);
  }
  &--confirm {
    background: var(--danger);
    color: var(--white);
  }
}

/* modal animation */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>