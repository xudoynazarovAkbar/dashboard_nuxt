<template>
  <div>
    <CustomTitle type="large">{{ $t('navigation.manageAdmins') }}</CustomTitle>
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