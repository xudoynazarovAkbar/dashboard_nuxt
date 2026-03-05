<template>
  <div
    class="page-wrapper"
    :class="{ dark: theme === 'dark' }"
  >
    <LayoutSidebar class="sidebar transition-colors duration-200" />
    <div class="wrapper_right">
      <LayoutHeader />
      <div class="main">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { theme } = useTheme()
</script>

<style scoped>
.sidebar {
  flex-shrink: 0;
}

.wrapper_right {
  width: 100%;
  display: flex;
  flex-direction: column;

  .main {
    flex: 1 1 0;
    padding: 32px;
  }
}
</style>
