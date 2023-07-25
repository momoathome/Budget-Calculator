<script lang="ts" setup>
const props = defineProps<{
  description: string
  balance: number
}>()

const formatedBalance = numberFormat(props.balance)
</script>

<template>
  <li class="flex list-none justify-between gap-12 bg-base px-4 py-3 text-xl font-600 shadow-md">
    {{ description }}
    <span>{{ formatedBalance }}</span>
  </li>
</template>

<style scoped>
</style>
