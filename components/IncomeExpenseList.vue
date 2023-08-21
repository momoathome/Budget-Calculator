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

const sortOrder = ref('ascending')
const sortKey = ref('text')

function toggleSortByText() {
  sortKey.value = 'text'
  sortOrder.value = sortOrder.value === 'ascending' ? 'descending' : 'ascending'
}
function toggleSortByAmount() {
  sortKey.value = 'amount'
  sortOrder.value = sortOrder.value === 'ascending' ? 'descending' : 'ascending'
}

const sortItems = computed(() => {
  const sortFunction = sortKey.value === 'amount'
    ? (itemA: { amount: number }, itemB: { amount: number }) => itemA.amount - itemB.amount
    : (itemA: { text: string }, itemB: { text: string }) => itemA.text.localeCompare(itemB.text)

  const sortedItems = Object.entries(props.data)
    .sort(([keyA, itemA], [keyB, itemB]) => {
      const result = sortFunction(itemA, itemB)
      return sortOrder.value === 'ascending' ? result : -result
    })
    .reduce((acc, [key, item]) => ({ ...acc, [key]: item }), {})

  return sortedItems
})

function submitNewIncomeExpenseItem(inputValue: string, inputAmount: number) {
  emit('submit', props.category, inputValue, inputAmount)
}
function deleteIncomeExpenseItem(dataKey: string) {
  emit('delete', props.category, dataKey)
}
function updateIncomeExpenseItem(inputValue: string, inputAmount: number, dataKey: string) {
  emit('update', props.category, inputValue, inputAmount, dataKey)
}

const { locale: _, t } = useI18n()

const categoryInfo = ref()
const isHovered = useElementHover(categoryInfo)
</script>

<template>
  <div class="relative mx-auto">
    <div class="me-2 flex flex-col">
      <div class="flex px-4 text-(xl primary) font-600">
        <h4 class="m-0">
          {{ t(`list.${props.category.toLowerCase()}`) }}
        </h4>
        <div class="flex-grow-1">
          <span ref="categoryInfo" i="tabler-info-circle" class="ms-1 text-xl" />
          <AppCategoryInfo v-if="isHovered">
            {{ t(`info.${props.category.toLowerCase()}`) }}
          </AppCategoryInfo>
        </div>
        <span>
          {{ numberFormat(totalValuePerKey) }}
        </span>
      </div>

      <div class="relative mx-4 h-1rem">
        <div class="flex gap-1">
          <button class="icon-btn" @click="toggleSortByText()">
            <div v-if="sortOrder === 'ascending'" i-tabler:sort-ascending-letters class="text-xl" />
            <div v-else i-tabler:sort-descending-letters class="text-xl" />
          </button>
          <button class="icon-btn" @click="toggleSortByAmount()">
            <div v-if="sortOrder === 'ascending'" i-tabler:sort-ascending-numbers class="text-xl" />
            <div v-else i-tabler:sort-descending-numbers class="text-xl" />
          </button>
        </div>
      </div>
    </div>

    <transition-group name="list" tag="ul" class="relative my-2 max-w-md ps-0">
      <!--  eslint-disable-next-line vue/no-extra-parens -->
      <income-expense-list-item v-for="(item, key) in sortItems" :key="key" :data-key="(key as string)" :item="item" :category="category" @update="updateIncomeExpenseItem" @delete="deleteIncomeExpenseItem" />
      <income-expense-list-new-item :key="category" :category="category" @submit="submitNewIncomeExpenseItem" />
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
