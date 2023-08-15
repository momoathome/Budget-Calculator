<script lang="ts" setup>
const props = defineProps<{
  category: string
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
const inputValue = ref<string>()
const inputAmount = ref<string>()

function onSubmit() {
  if (inputValue.value === '' || inputValue.value === undefined || inputAmount.value === undefined || inputAmount.value === null)
    return

  /*  const newIncomeExpenseItem = createIncomeExpenseItem(inputValue.value, parseLocaleNumber(inputAmount.value))
  setIncomeOrExpense(newIncomeExpenseItem, props.category) */

  emit('submit', inputValue.value, parseLocaleNumber(inputAmount.value))
  inputValue.value = ''
  inputAmount.value = ''
}

const { locale: _, t } = useI18n()
function locales() {
  const description = props.category === 'Income' ? 'Income' : 'Expense'

  return t(`inputs.${description.toLowerCase()}`)
}
</script>

<template>
  <li class="cashlist-item text-primary">
    <form action="" class="relative flex" @submit.prevent="onSubmit">
      <AppInput :key="category + 1" v-model:inputValue="inputValue" :placeholder="locales()" class="me-1 w-full outline-primary! placeholder:text-primary!" />
      <div class="pointer-events-none bg-base">
        <span class="mt-6px inline-block h-75% w-2px bg-list_divider" />
      </div>
      <AppInput :key="category + 2" v-model:inputValue="inputAmount" :placeholder="t('inputs.amount')" class="ms-1 w-70% outline-primary! placeholder:text-primary!" min="0" step="0.01" />

      <button type="submit" class="absolute right-4 top-5 text-2xl" prevent="default" i-tabler-circle-plus />
    </form>
  </li>
</template>

<style scoped>
</style>
