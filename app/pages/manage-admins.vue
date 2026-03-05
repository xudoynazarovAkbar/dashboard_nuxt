<template>
  <div>
    <h1 class="text-5xl">{{ $t('manage-admins') }}</h1>
    <AdminsForm
      @created="fetchAdmins"
      class="mt-5"
    />
    <AdminsList
      :data="admins"
      @deleted="fetchAdmins"
      class="mt-5"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

definePageMeta({
  middleware: ['role'],
  roles: ['director'],
})


const admins = ref<Omit<User, 'password'>[]>([])

const fetchAdmins = async () => {
  try {
    const data = await $fetch<Omit<User, 'password'>[]>('/api/admins')
    admins.value = data
  } catch (err) {
    console.error('Failed to fetch admins', err)
  }
}

onMounted(fetchAdmins)
</script>
