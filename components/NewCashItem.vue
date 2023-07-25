<script lang="ts" setup>
defineProps<{
  description: string
}>()
</script>

<template>
  <li class="flex list-none items-center gap-2 bg-base px-4 py-3 text-xl font-600 shadow-md text-primary_light">
    <div i-tabler-circle-plus class="text-2xl" />
    <span>new {{ description }}</span>
  </li>
</template>

<style scoped>
</style>
