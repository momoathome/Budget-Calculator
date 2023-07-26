<script lang="ts" setup>
defineProps<{
  description: string
}>()

// Vue Macros
/* const { modelValue } = defineModels<{
  modelValue: string
}>()

function onInput(e) {
  modelValue.value = e.target.value
} */

// Vue 3.3 Experimental
const modelValue = defineModel()
</script>

<template>
  <form action="" @submit.prevent>
    <li class="relative flex list-none items-center gap-2 bg-base text-xl font-600 shadow-md text-primary">
      <input v-model="modelValue" type="text" :placeholder="`new ${description}`"
        class="w-full border-none bg-base px-4 py-3 text-xl font-600 outline-3 outline-primary text-base_dark hover:cursor-pointer focus-visible:cursor-text placeholder-font-600 focus-visible:outline-solid hover:outline-solid placeholder-text-primary focus-visible:placeholder-text-primary_light">
      <button type="submit" class="absolute right-4 top-3.5 text-2xl" prevent="default" i-tabler-circle-plus />
    </li>
  </form>
</template>

<style scoped>
</style>
