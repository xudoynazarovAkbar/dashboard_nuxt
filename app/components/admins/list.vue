<template>
  <div>
    <h4 class="text-4xl">{{ $t('admins-list') }}</h4>
    <ul class="flex flex-col gap-y-4 mt-4">
      <li
        v-for="admin in data"
        :key="admin.id"
      >
        <AdminsItem
          v-bind="admin"
          @deleted="$emit('deleted')"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { User } from '#shared/types/models'

defineProps<{ data: Omit<User, 'password'>[] }>()
defineEmits<{ (e: 'deleted'): void }>()
</script>
