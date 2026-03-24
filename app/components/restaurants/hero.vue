<script setup lang="ts">
import type { RestaurantType } from '#shared/types/models'
 
defineProps<{
  restaurant: RestaurantType
}>()
</script>
 
<template>
  <div class="hero">
    <NuxtImg
      v-if="restaurant.image"
      class="hero-image"
      :src="restaurant.image"
      :alt="restaurant.name"
    />
    <div class="hero-overlay" />
    <div class="hero-content">
      <div v-if="restaurant.logotype" class="logotype-wrap">
        <NuxtImg class="logotype" :src="restaurant.logotype" :alt="restaurant.name" />
      </div>
      <div>
        <CustomTitle type="large" class="hero-title">
          {{ restaurant.name }}
        </CustomTitle>
        <div v-if="restaurant.tags?.length" class="tags">
          <span v-for="tag in restaurant.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
 
<style scoped lang="scss">
.hero {
  position: relative;
  width: 100%;
  height: 280px;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 28px;
}
 
.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}
 
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.85) 0%,
    rgba(0, 0, 0, 0.35) 55%,
    rgba(0, 0, 0, 0.15) 100%
  );
}
 
.hero-content {
  position: absolute;
  bottom: 20px;
  left: 24px;
  right: 24px;
  display: flex;
  align-items: flex-end;
  gap: 16px;
}
 
.logotype-wrap {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  border-radius: 14px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: var(--white);
}
 
.logotype {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
 
.hero-title {
  color: #fff !important;
}
 
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
}
 
.tag {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  padding: 3px 10px;
  backdrop-filter: blur(4px);
}
</style>