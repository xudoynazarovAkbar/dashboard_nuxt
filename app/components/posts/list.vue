<template>
  <ul class="grid grid-cols-3 gap-4">
    <li
      v-for="post in posts"
      :key="post.id"
      class="w-full"
    >
      <PostsItem
        v-bind="post"
        @deleted="fetchPosts"
        @edited="fetchPosts"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type Post } from '#shared/types/models'

const posts = ref<Post[]>([])

const fetchPosts = async () => {
  try {
    posts.value = await $fetch<Post[]>('/api/posts')
  } catch (err) {
    console.error('Failed to fetch posts', err)
  }
}

onMounted(fetchPosts)
</script>
