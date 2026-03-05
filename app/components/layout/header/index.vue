<template>
  <header class="flex w-full border-b-2 border-b-(--text)">
    <div class="custom-container flex justify-between items-center w-full p-3">
      <LayoutHeaderLogo />
      <div class="flex items-center gap-2.5">
        <div class="flex items-center gap-4">
          <span>EN</span>

          <LayoutHeaderSwitcher @toggle="handleToggle" />

          <span>UZ</span>
        </div>
        <div>|</div>
        <div class="flex items-center gap-4">
          <span>Dark</span>

          <LayoutHeaderSwitcher @toggle="toggleTheme" />

          <span>Light</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { setLocale } = useI18n()

const handleToggle = (val: boolean) => {
  const newLang = val ? 'uz' : 'en'
  setLocale(newLang)
}
const { toggleTheme } = useTheme()
</script>
