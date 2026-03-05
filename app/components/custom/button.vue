<template>
  <button
    class="bg-(--active) text-(--white) font-bold px-5 py-2 leading-tight border cursor-pointer rounded-3xl text-nowrap transition-opacity duration-300 hover:not-disabled:opacity-70 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <slot />
  </button>
</template>
