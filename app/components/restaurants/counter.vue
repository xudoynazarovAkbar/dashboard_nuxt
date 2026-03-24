<script setup lang="ts">
const props = defineProps<{
  modelValue: number
  min?: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const decrement = () => {
  const min = props.min ?? 1
  if (props.modelValue > min) emit('update:modelValue', props.modelValue - 1)
}

const increment = () => {
  emit('update:modelValue', props.modelValue + 1)
}
</script>

<template>
  <div class="counter">
    <button class="counter-btn" @click="decrement">−</button>
    <span class="counter-val">{{ modelValue }}</span>
    <button class="counter-btn" @click="increment">+</button>
  </div>
</template>

<style scoped lang="scss">
.counter {
  display: flex;
  align-items: center;
  border: 1.5px solid var(--greys);
  border-radius: 14px;
  overflow: hidden;
}

.counter-btn {
  width: 52px;
  height: 48px;
  border: none;
  background: transparent;
  font-size: 22px;
  font-weight: 600;
  color: var(--active);
  cursor: pointer;
  transition: background 0.15s;

  &:hover { background: var(--color); }
}

.counter-val {
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
	flex-basis: 33%;
}
</style>