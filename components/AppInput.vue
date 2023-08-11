<script lang="ts" setup>
const props = defineProps<{
  data?: any
  placeholder?: string
}>()

const inputValue = defineModel<string | number>('inputValue')
</script>

<template>
  <input
    v-model="inputValue" type="text" :placeholder="placeholder"
    class="max-w-xs cursor-pointer border-none bg-base px-4 py-4 text-(xl base_dark) font-600 outline-2 outline-base_dark focus-visible:(cursor-text outline-solid) hover:(outline-solid)"
  >
</template>
