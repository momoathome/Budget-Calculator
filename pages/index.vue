<script lang="ts" setup>
const { locale: currentLocale, t } = useI18n()

interface Income {
  [index: string]: Array<{ id: number; text: string; amount: number }>
}
interface Expense {
  [index: string]: Array<{ id: number; text: string; amount: number }>
}

const income: Income = reactive({
  Income: [
    { id: 1, text: 'Paycheck', amount: 2_218 },
  ],
})
const expenses: Expense = reactive({
  Utilities: [
    { id: 1, text: 'Handy', amount: 20 },
    { id: 2, text: 'Internet', amount: 16 },
    { id: 3, text: 'Strom', amount: 36 },
    { id: 4, text: 'Gez', amount: 12.5 },
  ],
  Bills: [
    { id: 1, text: 'Miete', amount: 250 },
    { id: 2, text: 'Auto Kredit', amount: 210 },
    { id: 3, text: 'Auto Versicherung', amount: 50.50 },
    { id: 4, text: 'Auto Steuer', amount: 4 },
    { id: 5, text: 'Private Haftpflicht', amount: 5.25 },
  ],
  Subscriptions: [
    { id: 1, text: 'Netflix', amount: 13 },
    { id: 2, text: 'Amazon Prime', amount: 9 },
    { id: 3, text: 'Dashlane', amount: 2.75 },
    { id: 4, text: 'Apple Cloud', amount: 1 },
  ],
  Other_Expenses: [
    { id: 1, text: 'Lebensmittel', amount: 200 },
    { id: 2, text: 'Benzin', amount: 150 },
    { id: 3, text: 'Friseur', amount: 30 },
    { id: 4, text: 'Verein', amount: 5 },
  ],
  Savings: [
    { id: 1, text: 'Fester Wert', amount: 52.50 },
  ],
})

const totalIncome = computed(() => getTotalAmounts(income))
const totalExpenses = computed(() => getTotalAmounts(expenses))
const totalBudget = computed(() => totalIncome.value - totalExpenses.value)
const totalIncomeValuePerKey = computed(() => getTotalValueForEachKey(income))
const totalExpensesValuePerKey = computed(() => getTotalValueForEachKey(expenses))

function getTotalAmounts(object: Expense | Income) {
  return Object.values(object).flatMap(array => array.map(val => val.amount)).reduce((sum, amount) => sum + amount, 0)
}

function getTotalValueForEachKey(object: Expense | Income) {
  const totalValuePerKey: { [key: string]: number } = {}

  Object.keys(object).forEach((key) => {
    const array = object[key]
    if (array && array.length > 0) {
      const totalValue = array.reduce((sum, val) => sum + val.amount, 0)
      totalValuePerKey[key] = totalValue
    }
  })

  return totalValuePerKey
}

function addObject(object: { id: number; text: string; amount: number }, index: string): void {
  if (index === 'Income')
    income.Paycheck.push(object)
  else expenses[index].push(object)
}

function onSubmit(inputValue: string, inputAmount: number, index: string) {
  const newObject = {
    id: getRandomNumber(0, 1_000_000),
    text: inputValue,
    amount: inputAmount,
  }

  addObject(newObject, index)
}
</script>

<template>
  <the-navbar />

  <main flex="~ 1 col" gap="8 lg:20" m="t-16">
    <div class="flex flex-col items-center">
      <div class="w-max">
        <h1 class="m-0 text-2xl">
          {{ t("main.Budget") }}
        </h1>
        <h2 class="m-0 text-6xl font-extrabold">
          {{ numberFormat(totalBudget) }}
        </h2>
      </div>
    </div>

    <div class="flex flex-col gap-20 px-6 xl:px-12">
      <div class="flex flex-col items-center">
        <div class="flex flex-col">
          <h3 class="mb-8 flex justify-center gap-8 text-2xl">
            {{ t("main.Income") }}
            <span class="font-extrabold">{{ numberFormat(totalIncome) }}</span>
          </h3>
          <cash-list :data="income.Income" index="Income" :total-value-per-key="totalIncomeValuePerKey.Income"
            @submit="onSubmit" />
        </div>
      </div>
      <div class="flex flex-col">
        <h3 class="mb-8 flex justify-center gap-8 text-2xl">
          {{ t("main.Expenses") }}
          <span class="font-extrabold">{{ numberFormat(totalExpenses) }}</span>
        </h3>
        <div class="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-12">
          <cash-list v-for="(item, index) in expenses" :key="index" :data="item" :index="index"
            :total-value-per-key="totalExpensesValuePerKey[index]" @submit="onSubmit" />
        </div>
      </div>
    </div>
  </main>
</template>
