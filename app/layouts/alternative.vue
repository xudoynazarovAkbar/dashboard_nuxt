<template>
  <div
    class="page-wrapper flex-col"
    :class="{ dark: theme === 'dark' }"
  >
    <LayoutHeader />
    <div class="main flex justify-center items-center">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const { theme } = useTheme()
</script>

<style scoped></style>
