<template>
  <nav>
    <ul>
      <li
        v-for="item in allowedNavItems"
        :key="item.path"
      >
        <NuxtLink
          :to="item.path"
          class="text-[20px]"
        >
          {{ t(item.labelKey) }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const { allowedNavItems } = useNavigation()
const { t } = useI18n()
</script>

<style scoped>
.router-link-exact-active {
  color: var(--active);
  font-weight: 500;
}
</style>
