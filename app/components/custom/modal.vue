<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="overlay"
      @click="close"
    >
      <div
        class="content"
        @click.stop
      >
        <slot :close="close"></slot>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

function close() {
  emit('update:modelValue', false)
}
</script>

<style scoped lang="scss">
.overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
}

.content {
  padding: 20px;
  background-color: white;
  border-radius: 24px;
  z-index: 100;
  max-width: 600px;
  width: 100%;
}
</style>
