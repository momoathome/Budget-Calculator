<script lang="ts" setup>
const props = defineProps<{
  index?: string
  data: object
}>()

const description = props.index === 'Income' ? 'Income' : 'Expense'
</script>

<template>
  <div>
    <h4 class="m-0 text-xl font-600 text-primary">
      {{ index }}
    </h4>
    <ul class="my-2 flex flex-col gap-4 ps-0">
      <cash-item v-for="(item, key) in props.data" :key="key" :balance="item" :description="key" />
      <new-cash-item :description="description" />
    </ul>
  </div>
</template>

<style scoped>
</style>
