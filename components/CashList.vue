<script lang="ts" setup>
type ObjIncomeExpenseItem = {
  amount: number
  text: string
}
type ObjData = {
  [key: string]: ObjIncomeExpenseItem
}
const props = defineProps<{
  category: string
  totalValuePerKey: number
  data: ObjData
}>()

const emit = defineEmits(['submit', 'delete'])
const inputValue = ref<string>()
const inputAmount = ref<number | string | null>(null)

function submitNewCashItem() {
  if (inputValue.value === '' || inputValue.value === null || inputValue.value === undefined || inputAmount.value === undefined || inputAmount.value === null)
    return

  emit('submit', inputValue.value, +inputAmount.value, props.category)
  inputValue.value = ''
  inputAmount.value = null
}

function deleteCashItem(dataKey: string) {
  emit('delete', props.category, dataKey)
}

const { locale: _, t } = useI18n()

function locales() {
  return t(`list.${props.category.toLowerCase()}`)
}
// newCashItem Placeholder description
const description = props.category === 'Income' ? 'Income' : 'Expense'
</script>

<template>
  <div>
    <div class="me-2 flex justify-between px-4 text-(xl primary) font-600">
      <h4 class="m-0">
        {{ locales() }}
        <!-- durch locales ersetzen -->
      </h4>
      <span class="">{{ numberFormat(totalValuePerKey) }}</span>
    </div>
    <ul class="my-2 flex flex-col gap-4 ps-0">
      <cash-item v-for="(item, key) in props.data" :key="key" :item="item" :data-key="key" @delete="deleteCashItem" />
      <new-cash-item v-model:inputValue="inputValue" v-model:inputAmount="inputAmount" :description="description" @submit="submitNewCashItem" />
    </ul>
  </div>
</template>

<style scoped>
</style>
