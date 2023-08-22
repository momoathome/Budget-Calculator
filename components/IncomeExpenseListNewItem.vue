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
const input = ref()
const { focused } = useFocus(input)

function onSubmit() {
  if (inputValue.value === '' || inputValue.value === undefined || inputAmount.value === undefined || inputAmount.value === null)
    return

  /*  const newIncomeExpenseItem = createIncomeExpenseItem(inputValue.value, parseLocaleNumber(inputAmount.value))
  setIncomeOrExpense(newIncomeExpenseItem, props.category) */

  emit('submit', inputValue.value, parseLocaleNumber(inputAmount.value))
  inputValue.value = ''
  inputAmount.value = ''
  focused.value = true
}

const { locale: _, t } = useI18n()
function locales() {
  const description = props.category === 'Income' ? 'Income' : 'Expense'

  return t(`inputs.${description.toLowerCase()}`)
}
</script>

<template>
  <li class="text-primary cashlist-item">
    <form action="" class="relative flex" @submit.prevent="onSubmit">
      <AppInput :key="category + 1" ref="input" v-model:inputValue="inputValue" :placeholder="locales()" class="me-1 w-full outline-primary! placeholder:text-primary!" />
      <div class="pointer-events-none">
        <span class="mt-6px inline-block h-75% w-2px bg-list_divider" />
      </div>
      <AppInput :key="category + 2" v-model:inputValue="inputAmount" :placeholder="t('inputs.amount')" class="ms-1 w-70% outline-primary! placeholder:text-primary!" min="0" step="0.01" />

      <button type="submit" class="absolute right-4 top-5 icon-btn" prevent="default">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0m6 0h6m-3-3v6" /></svg>
      </button>
    </form>
  </li>
</template>

<style scoped>
</style>
