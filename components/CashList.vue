<script lang="ts" setup>
const props = defineProps<{
  index: string
  data: {
    id: number
    text: string
    amount: number
  }[]
}>()

const description = props.index === 'Income' ? 'Income' : 'Expense'
</script>

<template>
  <div>
    <h4 class="m-0 text-xl font-600 text-primary">
      {{ index }}
    </h4>
    <ul class="my-2 flex flex-col gap-4 ps-0">
      <cash-item v-for="(item) in props.data" :key="item.id" :item="item" />
      <new-cash-item :key="index" :description="description" />
    </ul>
  </div>
</template>

<style scoped>
</style>
