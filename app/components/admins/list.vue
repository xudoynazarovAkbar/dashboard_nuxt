<template>
  <div>
    <h4 class="text-4xl">{{ $t('admins-list') }}</h4>
    <ul class="flex flex-col gap-y-4 mt-4">
      <li v-for="admin in admins" :key="admin.id">
        <AdminsItem v-bind="admin" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { admins } = useAdmins()
</script>