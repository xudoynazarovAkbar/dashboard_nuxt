<script setup lang="ts">
const emit = defineEmits<{
  (e: 'toggle', value: boolean): void
}>()

const isOn = ref(false)

const toggle = () => {
  isOn.value = !isOn.value
  emit('toggle', isOn.value)
}
</script>

<template>
  <div
    class="switch"
    :class="{ active: isOn }"
    @click="toggle"
  >
    <div class="circle" />
  </div>
</template>

<style scoped>
.switch {
  width: 50px;
  height: 26px;
  background: var(--active);
  border-radius: 999px;
  padding: 3px;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
}

.circle {
  width: 20px;
  height: 20px;
  background: var(--white);
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.switch.active .circle {
  transform: translateX(24px);
}
</style>
