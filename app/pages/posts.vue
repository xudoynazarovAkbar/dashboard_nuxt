<template>
  <div>
    <CustomTitle type="large">{{ $t('navigation.posts') }}</CustomTitle>
    <div class="mt-4">
      <h4 v-if="pending">{{ $t('common.loading') }}</h4>
      <PostsList
        :data="data"
        v-else
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { data, pending } = await useFetch('/api/posts')
</script>

<style scoped></style>
