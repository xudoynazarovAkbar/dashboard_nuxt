<script setup lang="ts">
const { logout } = useAuth()
</script>

<template>
  <aside
    class="w-62.5 bg-(--background) p-5 text-(--text) border-2 border-(--text) flex flex-col justify-between"
  >
    <LayoutSidebarNavBar />
    <CustomButton @click="logout">{{ $t('logout') }}</CustomButton>
  </aside>
</template>
