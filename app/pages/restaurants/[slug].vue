<script setup lang="ts">
import type { ProductType } from '#shared/types/models'

const { categories, currentRestaurant, error, pending, products } = useRestaurant()
const { addItem, replaceCart, isFromDifferentRestaurant, quantityOf } = useCart()

const activeCategory = ref<number | null>(null)

const filteredProducts = computed(() => {
  if (activeCategory.value === null) return products.value
  return products.value
    .map((group) => ({ ...group, products: group.products.filter((p) => p.is_available) }))
    .filter((group) => group.id === activeCategory.value && group.products.length)
})

// ── Add-to-cart modal ──────────────────────────────────────────────────
const modalProduct = ref<ProductType | null>(null)
const modalQty = ref(1)
const showAddModal = ref(false)

const openAddModal = (product: ProductType) => {
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
  if (!modalProduct.value || !currentRestaurant.value) return
  const restaurantInfo = {
    id: currentRestaurant.value.id,
    name: currentRestaurant.value.name,
    slug: currentRestaurant.value.slug,
    logotype: currentRestaurant.value.logotype,
  }
  addItem(modalProduct.value, modalQty.value, restaurantInfo)
  closeAddModal()
  navigateTo('/cart')
}

// ── Conflict modal ─────────────────────────────────────────────────────
const pendingProduct = ref<ProductType | null>(null)
const showConflictModal = ref(false)

const handleAddClick = (product: ProductType) => {
  if (!product.is_available || !currentRestaurant.value) return
  if (isFromDifferentRestaurant(currentRestaurant.value.id)) {
    pendingProduct.value = product
    showConflictModal.value = true
    return
  }
  openAddModal(product)
}

const cancelConflict = () => {
  showConflictModal.value = false
  pendingProduct.value = null
}

const confirmConflict = () => {
  if (!pendingProduct.value || !currentRestaurant.value) return
  const restaurantInfo = {
    id: currentRestaurant.value.id,
    name: currentRestaurant.value.name,
    slug: currentRestaurant.value.slug,
    logotype: currentRestaurant.value.logotype,
  }
  replaceCart(pendingProduct.value, 1, restaurantInfo)
  showConflictModal.value = false
  pendingProduct.value = null
  navigateTo('/cart')
}
</script>

<template>
  <div class="page">
    <!-- Error -->
    <div v-if="error" class="state-box error-box">
      <span class="state-icon">⚠️</span>
      <CustomTitle type="medium">{{ error }}</CustomTitle>
    </div>

    <!-- Loading -->
    <template v-else-if="pending">
      <div class="hero-skeleton shimmer" />
      <div class="skeleton-row">
        <div v-for="i in 4" :key="i" class="pill-skeleton shimmer" />
      </div>
      <div class="grid">
        <div v-for="i in 10" :key="i" class="card-skeleton shimmer" />
      </div>
    </template>

    <!-- Content -->
    <template v-else-if="currentRestaurant">
      <RestaurantsHero :restaurant="currentRestaurant" />

      <RestaurantsCategories
        v-if="categories.length"
        :categories="categories"
        v-model="activeCategory"
      />

      <RestaurantsProducts
        v-if="filteredProducts.length"
        :groups="filteredProducts"
        :quantity-of="quantityOf"
        @add="handleAddClick"
      />

      <div v-else class="state-box">
        <span class="state-icon">🍽️</span>
        <CustomTitle type="medium">{{ $t('common.noProducts') }}</CustomTitle>
      </div>
    </template>

    <!-- Add to cart modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showAddModal && modalProduct" class="modal-backdrop" @click.self="closeAddModal">
          <div class="modal">
            <button class="modal-close" @click="closeAddModal">✕</button>
            <div class="modal-image-wrap">
              <NuxtImg class="modal-image" :src="modalProduct.photo" :alt="modalProduct.name" />
            </div>
            <div class="modal-body">
              <p class="modal-name">{{ modalProduct.name }}</p>
              <p class="modal-desc">{{ modalProduct.description }}</p>
              <div class="modal-price-row">
                <span v-if="modalProduct.price_original > modalProduct.price" class="price-original">
                  {{ modalProduct.price_original }}
                </span>
                <span class="modal-price">{{ modalProduct.price }}</span>
              </div>
              <RestaurantsCounter v-model="modalQty" :min="1" />
              <button class="modal-submit" @click="confirmAdd">
                {{ $t('cart.addToCartWithPrice', { price: modalProduct.price * modalQty }) }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Conflict modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showConflictModal" class="modal-backdrop" @click.self="cancelConflict">
          <div class="modal modal--conflict">
            <div class="conflict-icon">🛒</div>
            <p class="conflict-title">{{ $t('cart.conflictModal.title') }}</p>
            <p class="conflict-desc">{{ $t('cart.conflictModal.description') }}</p>
            <div class="conflict-actions">
              <button class="conflict-btn conflict-btn--cancel" @click="cancelConflict">
                {{ $t('cart.conflictModal.cancel') }}
              </button>
              <button class="conflict-btn conflict-btn--confirm" @click="confirmConflict">
                {{ $t('cart.conflictModal.confirm') }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
.page {
  padding-bottom: 48px;
  display: flex;
  flex-direction: column;
}

/* ── State boxes ──────────────────────────────── */
.state-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 64px 24px;
  text-align: center;
}

.state-icon { font-size: 40px; }
.error-box  { color: var(--danger); }

/* ── Skeletons ────────────────────────────────── */
@keyframes shimmer {
  0%   { background-position: -600px 0; }
  100% { background-position:  600px 0; }
}

.shimmer {
  border-radius: 16px;
  background: linear-gradient(90deg, var(--color) 25%, var(--greys) 50%, var(--color) 75%);
  background-size: 600px 100%;
  animation: shimmer 1.4s infinite linear;
}

.hero-skeleton { height: 280px; margin-bottom: 28px; }
.skeleton-row  { display: flex; gap: 8px; margin-bottom: 28px; }
.pill-skeleton { height: 38px; width: 90px; border-radius: 100px; }
.card-skeleton { height: 260px; }

.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
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

  @media (min-width: 600px) { align-items: center; }
}

.modal {
  position: relative;
  width: 100%;
  max-width: 480px;
  background: var(--white);
  border-radius: 24px 24px 0 0;
  overflow: hidden;

  @media (min-width: 600px) { border-radius: 24px; }
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
  z-index: 1;
  transition: background 0.15s;

  &:hover { background: rgba(0, 0, 0, 0.2); }
}

.modal-image-wrap {
  width: 100%;
  height: 220px;
  overflow: hidden;
}

.modal-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
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
  color: var(--text);
  line-height: 1.3;
}

.modal-desc {
  font-size: 14px;
  color: var(--secondary-color);
  line-height: 1.5;
}

.modal-price-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-top: 4px;
}

.modal-price {
  font-size: 20px;
  font-weight: 800;
  color: var(--text);
}

.price-original {
  font-size: 13px;
  font-weight: 600;
  color: var(--danger);
  text-decoration: line-through;
}

.modal-submit {
  margin-top: 8px;
  width: 100%;
  padding: 15px;
  border-radius: 14px;
  border: none;
  background: var(--active);
  color: var(--white);
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.15s, transform 0.15s;

  &:hover { opacity: 0.9; transform: translateY(-1px); }
  &:active { transform: translateY(0); }
}

.modal--conflict {
  padding: 36px 28px 32px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.conflict-icon  { font-size: 48px; }
.conflict-title { font-size: 20px; font-weight: 700; color: var(--text); }
.conflict-desc  { font-size: 14px; color: var(--secondary-color); line-height: 1.6; max-width: 320px; }

.conflict-actions {
  display: flex;
  gap: 10px;
  margin-top: 8px;
  width: 100%;
}

.conflict-btn {
  flex: 1;
  padding: 13px;
  border-radius: 12px;
  border: none;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;

  &:hover { opacity: 0.85; }
  &--cancel  { background: var(--color); color: var(--text); }
  &--confirm { background: var(--danger); color: var(--white); }
}

.modal-enter-active, .modal-leave-active {
  transition: opacity 0.25s ease;
  .modal { transition: transform 0.25s ease; }
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
  .modal { transform: translateY(40px); }
}
</style>