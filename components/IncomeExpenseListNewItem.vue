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
const inputAmount = defineModel<number | string>('inputAmount')
const onSubmit = () => emit('submit', props.description)

const { locale: _, t } = useI18n()
function locales() {
  return t(`inputs.${props.description.toLowerCase()}`)
}
</script>

<template>
  <li class="cashlist-item text-primary">
    <form action="" class="relative flex" @submit.prevent="onSubmit">
      <AppInput id="1" v-model:inputValue="inputValue" :placeholder="locales()" class="me-1 w-full outline-primary! placeholder:text-primary!" />
      <div class="pointer-events-none bg-base">
        <span class="mt-6px inline-block h-75% w-2px bg-list_divider" />
      </div>
      <AppInput id="2" v-model:inputValue="inputAmount" :placeholder="t('inputs.amount')" class="ms-1 w-70% outline-primary! placeholder:text-primary!" min="0" step="0.01" />

      <button type="submit" class="absolute right-4 top-5 text-2xl" prevent="default" i-tabler-circle-plus />
    </form>
  </li>
</template>

<style scoped>
</style>
