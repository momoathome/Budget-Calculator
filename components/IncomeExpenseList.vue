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

const emit = defineEmits(['submit', 'delete', 'update'])

function submitNewIncomeExpenseItem(inputValue: string, inputAmount: number) {
  emit('submit', props.category, inputValue, inputAmount)
}
function deleteIncomeExpenseItem(dataKey: string) {
  emit('delete', props.category, dataKey)
}
function updateIncomeExpenseItem(inputValue: string, inputAmount: number, dataKey: string) {
  if (inputValue === '' || inputAmount === undefined || inputAmount === null || Number.isNaN(inputAmount))
    return

  emit('update', props.category, inputValue, inputAmount, dataKey)
}

const { locale: _, t } = useI18n()

function displayCategoryLocalValue() {
  return t(`list.${props.category.toLowerCase()}`)
}
// newIncomeExpenseListItem Placeholder description
const description = props.category === 'Income' ? 'Income' : 'Expense'
</script>

<template>
  <div class="mx-auto">
    <div class="me-2 flex justify-between px-4 text-(xl primary) font-600">
      <h4 class="m-0">
        {{ displayCategoryLocalValue() }}
      </h4>
      <span class="">{{ numberFormat(totalValuePerKey) }}</span>
    </div>
    <transition-group name="list" tag="ul" class="relative my-2 max-w-md ps-0">
      <income-expense-list-item v-for="(item, key) in props.data" :key="key" :data-key="key" :item="item" @update="updateIncomeExpenseItem" @delete="deleteIncomeExpenseItem" />
      <income-expense-list-new-item :key="category" :description="description" @submit="submitNewIncomeExpenseItem" />
    </transition-group>
  </div>
</template>

<style>
/*
  TODO: refine animation
*/
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all .5s ease;
}

.list-enter-to,
.list-leave-from {
  opacity: 1;
  transform: scale(1);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.6);
}

/* ensure leaving items are taken out of layout flow so that moving animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
