<template>
  <div>
    <h1 class="text-5xl">{{ $t('posts') }}</h1>
    <div class="mt-4">
      <h4 v-if="pending">Loading ...</h4>
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
