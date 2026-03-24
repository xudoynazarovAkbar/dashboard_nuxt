<template>
  <div>
    <CustomTitle type="large">{{ $t('navigation.createPost') }}</CustomTitle>
    <div class="flex flex-col gap-y-3 mt-5">
      <CustomInput v-model="newPost.title" />
      <CustomInput v-model="newPost.body" />
      <div class="w-full flex justify-end">
        <CustomButton @click="onCreate">
          {{ $t('actions.create') }}
        </CustomButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  middleware: ['role'],
  roles: [ROLES.ADMIN, ROLES.DIRECTOR],
})
const newPost = ref({
  title: '',
  body: '',
})
const onCreate = async () => {
  try {
    await $fetch(`/api/posts`, {
      method: 'POST',
      body: newPost.value,
    })
  } catch (err) {
    console.error('Failed to update post', err)
  } finally {
    newPost.value.title = ''
    newPost.value.body = ''
  }
}
</script>

<style scoped></style>
