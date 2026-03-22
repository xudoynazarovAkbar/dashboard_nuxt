<template>
  <div>
    <h1 class="text-5xl">{{ $t('manage-admins') }}</h1>
    <AdminsForm class="mt-5" />
    <AdminsList class="mt-5" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['role'],
  roles: [ROLES.DIRECTOR],
})

await useFetch('/api/admins', { key: 'admins' })
</script>