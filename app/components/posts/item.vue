<template>
  <div class="p-4 border border-(--text) rounded-2xl h-full flex flex-col gap-4">
    <CustomTitle type="medium">{{ title }}</CustomTitle>
    <p class="grow">{{ body }}</p>
    <PostsControls
      class="w-full flex justify-between gap-x-3"
      v-if="canManagePosts(user?.role)"
      @delete="onDelete"
      @edit="isEditing = true"
    />
  </div>
  <CustomModal v-model="isEditing">
    <div class="flex flex-col gap-y-3">
      <CustomInput v-model="edittedValues.title" />
      <CustomInput v-model="edittedValues.body" />
      <div class="w-full flex justify-between gap-x-40">
        <CustomButton
          class="w-full"
          @click="isEditing = false"
          >{{ $t('actions.cancel') }}</CustomButton
        >
        <CustomButton
          class="w-full"
          @click="onEdit"
          >{{ $t('actions.edit') }}</CustomButton
        >
      </div>
    </div>
  </CustomModal>
</template>

<script setup lang="ts">
import { type Post } from '#shared/types/models'
import { canManagePosts } from '~/shared/utils/permissions'
import { useAuth } from '~/composables/useAuth'
import { ref } from 'vue'

const { user } = useAuth()
const { title, body, id } = defineProps<Post>()

const emit = defineEmits<{
  (e: 'deleted'): void
  (e: 'edited'): void
}>()
const isEditing = ref(false)
const edittedValues = ref({
  title: title,
  body: body,
})

const onDelete = async () => {
  try {
    await $fetch(`/api/posts/${id}`, { method: 'DELETE' })
    emit('deleted')
  } catch (err) {
    console.error('Failed to delete post', err)
  }
}
const onEdit = async () => {
  try {
    await $fetch(`/api/posts/${id}`, {
      method: 'PATCH',
      body: edittedValues.value,
    })
    emit('edited')
  } catch (err) {
    console.error('Failed to update post', err)
  } finally {
    isEditing.value = false
  }
}
</script>
