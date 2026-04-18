<template>
  <div>
    <CustomTitle type="large" class="mb-2.5">{{ $t('navigation.home') }}</CustomTitle>
    <h3 class="text-4xl">{{ $t('welcome') }}</h3>
  </div>
</template>

<script setup lang="ts">
  const random = JSON.parse(JSON.stringify({
    text: "Hello world"
  }))

  console.log(random.text);
  
</script>

<style scoped></style>
