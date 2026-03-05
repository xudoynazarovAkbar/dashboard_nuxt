<template>
  <div class="flex w-full gap-x-3 items-center">
    <div class="grow">{{ props.username }}</div>
    <CustomButton @click="onDelete">{{ $t('actions.delete') }}</CustomButton>
  </div>
</template>

<script setup lang="ts">
import type { User } from '#shared/types/models'

const props = defineProps<Omit<User, 'password'>>()
const emit = defineEmits<{ (e: 'deleted'): void }>()

const onDelete = async () => {
  try {
    await $fetch(`/api/admins/${props.id}`, { method: 'DELETE' })
    emit('deleted')
  } catch (err) {
    console.error('Failed to delete admin', err)
  }
}
</script>
