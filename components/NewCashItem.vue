<script lang="ts" setup>
const props = defineProps<{
  description: string
}>()

const emit = defineEmits(['submit'])

// Vue Macros
/* const { modelValue } = defineModels<{
  modelValue: string
}>()

function onInput(e) {
  modelValue.value = e.target.value
} */

// Vue 3.3 Experimental
const inputValue = defineModel<string | number>('inputValue')
const inputAmount = defineModel<number | string | null>('inputAmount')
// Todo: add modelValue for the Amount

const onSubmit = () => emit('submit', props.description)
</script>

<template>
  <li class="cashlist-item text-primary hover:(cursor-pointer outline-solid)">
    <form action="" class="flex" @submit.prevent="onSubmit">
      <input v-model="inputValue" type="text" :placeholder="`new ${description}`"
        class="me-1 w-full border-none bg-base py-3 ps-4 text-(xl base_dark) font-600 outline-3 outline-primary hover:cursor-pointer focus-visible:(cursor-text outline-solid placeholder-text-primary_light) placeholder:(font-600 text-primary)">
      <div class="bg-base">
        <span class="mt-6px inline-block h-75% w-1px bg-divider" />
      </div>
      <input v-model="inputAmount" type="number" placeholder="amount" min="0" step="0.01"
        class="ms-1 w-70% border-none bg-base px-4 py-3 text-(xl base_dark) font-600 outline-3 outline-primary lg:w-50% hover:cursor-pointer focus-visible:(cursor-text outline-solid placeholder-text-primary_light) placeholder:(font-600 text-primary)">

      <button type="submit" class="absolute right-4 top-3.5 text-2xl" prevent="default" i-tabler-circle-plus />
    </form>
  </li>
</template>

<style scoped>
</style>
