<script setup lang="ts">
import type { RestaurantCategoriesType } from '#shared/types/models'

defineProps<{
  categories: RestaurantCategoriesType
  modelValue: number | null
}>()

defineEmits<{
  'update:modelValue': [value: number | null]
}>()
</script>

<template>
  <div class="categories-wrapper">
    <div class="categories-scroll">
      <button
        class="pill"
        :class="{ active: modelValue === null }"
        @click="$emit('update:modelValue', null)"
      >
        Все
      </button>
      <button
        v-for="cat in categories"
        :key="cat.id"
        class="pill"
        :class="{ active: modelValue === cat.id }"
        @click="$emit('update:modelValue', cat.id)"
      >
        {{ cat.title }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.categories-wrapper {
  width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
  margin-bottom: 28px;
  min-height: 40px;
  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }
}

.categories-scroll {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  gap: 8px;
  padding-bottom: 4px;
}

.pill {
  flex-shrink: 0;
  padding: 8px 18px;
  border-radius: 100px;
  border: 1.5px solid var(--greys);
  background: var(--white);
  font-size: 14px;
  font-weight: 600;
  color: var(--secondary-color);
  cursor: pointer;
  transition:
    background 0.18s,
    color 0.18s,
    border-color 0.18s;

  &.active {
    background: var(--active);
    color: var(--white);
    border-color: transparent;
  }

  &:hover:not(.active) {
    border-color: var(--active);
    color: var(--active);
  }
}
</style>
