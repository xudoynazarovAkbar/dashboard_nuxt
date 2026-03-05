<template>
  <div>
    <h1 class="text-4xl">{{ $t('create-admin') }}</h1>
    <div class="flex flex-col gap-y-3 mt-5">
      <CustomInput
        v-model="newAdmin.username"
        placeholder="Username"
      />
      <CustomInput
        v-model="newAdmin.password"
        placeholder="Password"
        type="password"
      />
      <div class="w-full flex justify-end">
        <CustomButton @click="onCreate">{{ $t('actions.create') }}</CustomButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{ (e: 'created'): void }>()

const newAdmin = ref({
  username: '',
  password: '',
})

const onCreate = async () => {
  if (!newAdmin.value.username || !newAdmin.value.password) {
    alert('Username and password required')
    return
  }

  try {
    await $fetch('/api/admins', { method: 'POST', body: newAdmin.value })
    emit('created')
  } catch (err) {
    console.error('Failed to create admin', err)
  } finally {
    newAdmin.value.username = ''
    newAdmin.value.password = ''
  }
}
</script>
