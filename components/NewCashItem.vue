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
    <li class="relative flex list-none items-center gap-2 bg-base text-(xl primary) font-600 shadow-md">
      <input v-model="modelValue" type="text" :placeholder="`new ${description}`"
        class="w-full border-none bg-base px-4 py-3 text-(xl base_dark) font-600 outline-3 outline-primary hover:(cursor-pointer outline-solid) focus-visible:(cursor-text outline-solid placeholder-text-primary_light) placeholder:(font-600 text-primary)">
      <button type="submit" class="absolute right-4 top-3.5 text-2xl" prevent="default" i-tabler-circle-plus />
    </li>
  </form>
</template>

<style scoped>
</style>
