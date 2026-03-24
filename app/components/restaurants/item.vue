<script setup lang="ts">
const props = defineProps<{ data: RestaurantType }>()
const tags = props.data.tags?.join(', ') || 'No tags'

</script>

<template>
  <NuxtLink
		:to="`/restaurants/${data.slug}`"
    class="w-full h-full"
  >
    <div class="imageWrapper">
      <NuxtImg
        class="cardImage"
        :src="data.image"
        :alt="data.name"
      />
    </div>

    <div class="p-3! flex flex-col gap-1.5 items-start">
      <CustomTitle type="small">{{ data.name }}</CustomTitle>
      <p class="cardTags">{{ tags }}</p>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.imageWrapper {
  width: 100%;
  height: 179px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
}

.cardImage {
  object-fit: cover;
  object-position: center;
  display: block;
}

.cardTags {
  font-weight: 600;
  font-size: 14px;
  line-height: 100%;
  color: var(--greys-dark-grey);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
