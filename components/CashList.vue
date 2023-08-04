<script lang="ts" setup>
type ObjIncomeExpenseItem = {
  amount: number
  id: number
  text: string
}

type ObjData = {
  [key: string]: ObjIncomeExpenseItem
}

const props = defineProps<{
  index: string | number
  totalValuePerKey: number
  data: ObjData
}>()

const emit = defineEmits(['submit', 'delete'])

// newCashItem Placeholder description
const description = props.index === 'Income' ? 'Income' : 'Expense'

const inputValue = ref<string>()
const inputAmount = ref<number | string | null>(null)

function submitNewCashItem() {
  if (inputValue.value === '' || inputValue.value === null || inputValue.value === undefined || inputAmount.value === undefined || inputAmount.value === null)
    return

  emit('submit', inputValue.value, +inputAmount.value, props.index)
  inputValue.value = ''
  inputAmount.value = null
}

function deleteCashItem(dataKey: string) {
  emit('delete', props.index, dataKey)
}
</script>

<template>
  <div>
    <div class="flex ps-4 text-(xl primary) font-600">
      <h4 class="m-0 w-full">
        {{ index }}
      </h4>
      <span class="w-70% ps-2 lg:w-50%">{{ numberFormat(totalValuePerKey) }}</span>
    </div>
    <ul class="my-2 flex flex-col gap-4 ps-0">
      <cash-item v-for="(item, key) in props.data" :key="key" :item="item" :data-key="key" @delete="deleteCashItem" />
      <new-cash-item v-model:inputValue="inputValue" v-model:inputAmount="inputAmount" :description="description" @submit="submitNewCashItem" />
    </ul>
  </div>
</template>

<style scoped>
</style>
