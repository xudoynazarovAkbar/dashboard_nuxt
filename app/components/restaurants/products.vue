<script setup lang="ts">
import type { ProductType, RestaurantProductsType } from '#shared/types/models'

defineProps<{
  groups: RestaurantProductsType
  quantityOf: (productId: number) => number
}>()

defineEmits<{
  'add': [product: ProductType]
}>()
</script>

<template>
  <div class="sections">
    <section v-for="group in groups" :key="group.id" class="section">
      <CustomTitle type="medium" class="section-title">{{ group.title }}</CustomTitle>
      <ul class="grid">
        <li v-for="product in group.products" :key="product.id">
          <div class="product-card" :class="{ unavailable: !product.is_available }">
            <div class="product-image-wrap">
              <NuxtImg
                class="product-image"
                :src="product.photo"
                :alt="product.name"
              />
              <span v-if="!product.is_available" class="unavailable-badge">
                {{ $t('unavailable') }}
              </span>
              <span v-if="quantityOf(product.id) > 0" class="in-cart-badge">
                {{ quantityOf(product.id) }}
              </span>
            </div>
            <div class="product-body">
              <p class="product-name">{{ product.name }}</p>
              <p class="product-desc">{{ product.description }}</p>
              <div class="product-footer">
                <div class="price-wrap">
                  <span
                    v-if="product.price_original > product.price"
                    class="price-original"
                  >
                    {{ product.price_original }}
                  </span>
                  <span class="price">{{ product.price }}</span>
                </div>
                <button
                  class="add-btn"
                  :class="{ 'in-cart': quantityOf(product.id) > 0 }"
                  :disabled="!product.is_available"
                  @click="$emit('add', product)"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 01-8 0"/>
                  </svg>
                  <span class="add-btn-plus">+</span>
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped lang="scss">
.sections {
  display: flex;
  flex-direction: column;
  gap: 36px;
}

.section-title {
  margin-bottom: 16px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 560px) { grid-template-columns: 1fr; }
}

.product-card {
  border: 1px solid var(--greys);
  border-radius: 16px;
  background: var(--background);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px var(--shadow);
  }

  &.unavailable { opacity: 0.6; }
}

.product-image-wrap {
  position: relative;
  height: 160px;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transition: transform 0.3s ease;

  .product-card:hover & { transform: scale(1.04); }
}

.unavailable-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  background: rgba(0, 0, 0, 0.55);
  color: var(--white);
  padding: 3px 8px;
  border-radius: 6px;
  backdrop-filter: blur(4px);
}

.in-cart-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--active);
  color: var(--white);
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-body {
  padding: 12px 14px 14px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 4px;
}

.product-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--text);
  line-height: 1.3;
}

.product-desc {
  font-size: 13px;
  color: var(--secondary-color);
  line-height: 1.45;
  flex: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}

.price-wrap {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.price {
  font-size: 16px;
  font-weight: 800;
  color: var(--text);
}

.price-original {
  font-size: 13px;
  font-weight: 600;
  color: var(--danger);
  text-decoration: line-through;
}

.add-btn {
  position: relative;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  border: none;
  background: var(--active);
  color: var(--white);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.15s, transform 0.15s, background 0.15s;
  flex-shrink: 0;

  &:hover:not(:disabled) { transform: scale(1.1); }
  &:disabled { opacity: 0.35; cursor: not-allowed; }
  &.in-cart { background: var(--success, #28a745); }
}

.add-btn-plus {
  position: absolute;
  bottom: 4px;
  right: 5px;
  font-size: 13px;
  font-weight: 800;
  line-height: 1;
}
</style>