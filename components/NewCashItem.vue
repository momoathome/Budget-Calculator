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
const onSubmit = () => emit('submit', props.description)

const { locale: _, t } = useI18n()
function locales() {
  return t(`inputs.${props.description.toLowerCase()}`)
}
</script>

<template>
  <li class="cashlist-item text-primary">
    <form action="" class="relative flex" @submit.prevent="onSubmit">
      <input
        v-model="inputValue" type="text" :placeholder="`${locales()}`"
        class="me-1 w-full border-none bg-base py-4 ps-4 text-(xl base_dark) font-600 outline-2 outline-primary hover:(cursor-pointer outline-solid) focus-visible:(cursor-text outline-solid placeholder-text-primary_light) placeholder:(font-600 text-primary)"
      >
      <div class="pointer-events-none bg-base">
        <span class="mt-6px inline-block h-75% w-2px bg-list_divider" />
      </div>
      <input
        v-model="inputAmount" type="number" :placeholder="t('inputs.amount')" min="0" step="0.01"
        class="ms-1 w-70% border-none bg-base px-4 py-4 text-(xl base_dark) font-600 outline-2 outline-primary hover:(cursor-pointer outline-solid) focus-visible:(cursor-text outline-solid placeholder-text-primary_light) placeholder:(font-600 text-primary)"
      >

      <button type="submit" class="absolute right-4 top-5 text-2xl" prevent="default" i-tabler-circle-plus />
    </form>
  </li>
</template>

<style scoped>
</style>
