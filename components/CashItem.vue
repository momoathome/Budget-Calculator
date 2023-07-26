<script lang="ts" setup>
const props = defineProps<{
  item: {
    id: number
    text: string
    amount: number
  }
}>()

const formatedAmount = numberFormat(props.item.amount)
</script>

<template>
  <li class="flex list-none justify-between gap-12 bg-base px-4 py-3 text-xl font-600 shadow-md">
    {{ item.text }}
    <span>{{ formatedAmount }}</span>
  </li>
</template>

<style scoped>
</style>
