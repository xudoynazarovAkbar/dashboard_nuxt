<template>
  <div class="field">
    <label
      v-if="label"
      :for="id"
      class="label"
    >
      {{ label }}
    </label>

    <div class="input-wrapper">
      <input
        :id="id"
        class="input"
        v-bind="attrs"
        :value="internalValue"
        @input="updateValue"
        :class="{ error: error }"
      />
      <div class="right-icon">
        <slot></slot>
      </div>
    </div>

    <span class="error-msg">
      {{ error }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, useAttrs, useId } from 'vue'

const props = defineProps<{
  label?: string
  modelValue?: string
  error?: string
}>()

const emit = defineEmits(['update:modelValue'])

defineOptions({ inheritAttrs: false })

const id = useId()
const attrs = useAttrs()

const internalValue = ref(props.modelValue ?? '')

watch(
  () => props.modelValue,
  (val) => {
    if (val !== internalValue.value) {
      internalValue.value = val ?? ''
    }
  },
)

function updateValue(e: Event) {
  const target = e.target as HTMLInputElement
  internalValue.value = target.value
  emit('update:modelValue', target.value)
}
</script>

<style scoped>
.field {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;
  position: relative;
  color: var(--text);
}

.label {
  font-size: 14px;
  opacity: 0.8;
}

.input {
  min-height: 24px;
  padding: 10px 40px 10px 14px;
  border-radius: 8px;
  border: 1px solid var(--text);
  background: var(--background);
  width: 100%;
  outline: none;
}

.input-wrapper {
  position: relative;
  width: 100%;
}

.error {
  border: 1px solid var(--danger) !important;
}

.right-icon {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  user-select: none;
  opacity: 0.7;
}

.error-msg {
  color: var(--danger);
  position: absolute;
  top: calc(100% + 2px);
  right: 0;
  font-size: 14px;
}
</style>
