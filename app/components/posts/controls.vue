<template>
  <div>
    <CustomButton
      class="w-full"
      @click="$emit('edit')"
      >{{ $t('actions.edit') }}</CustomButton
    >
    <CustomButton
      class="w-full"
      @click="$emit('delete')"
      >{{ $t('actions.delete') }}</CustomButton
    >
  </div>
</template>

<script setup lang="ts"></script>
