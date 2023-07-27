<script lang="ts" setup>
const { locale: currentLocale, t } = useI18n()

const income = {
  Paycheck: [
    { id: 1, text: 'Paycheck', amount: 2_218 },
  ],
}
const expenses = {
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
  Other_Expenses: [
    { id: 1, text: 'Lebensmittel', amount: 200 },
    { id: 2, text: 'Benzin', amount: 150 },
    { id: 3, text: 'Netflix', amount: 13 },
    { id: 4, text: 'Amazon Prime', amount: 9 },
    { id: 5, text: 'Friseur', amount: 30 },
    { id: 6, text: 'Dashlane', amount: 2.75 },
    { id: 7, text: 'Apple', amount: 1 },
    { id: 8, text: 'Verein', amount: 5 },
  ],
  Savings: [
    { id: 1, text: 'Fester Wert', amount: 52.50 },
  ],
}

const totalIncome = computed(() => getTotalAmounts(income))
const totalExpenses = computed(() => getTotalAmounts(expenses))
const totalBudget = computed(() => totalIncome.value - totalExpenses.value)

function getTotalAmounts(object: { [s: string]: any } | ArrayLike<any>) {
  const amounts: number[] = []

  Object.values(object).forEach(array => array.map((val: { amount: number }) => amounts.push(val.amount)))
  return amounts.reduce((sum, amount) => (sum += amount), 0)
}
</script>

<template>
  <div>
    <the-navbar />

    <div class="flex-center flex-col gap-12">
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

        <div class="flex flex-col justify-center gap-20 px-6 lg:flex-row">
          <div>
            <h3 class="flex justify-between gap-8 pe-4 text-2xl">
              {{ t("main.Income") }}
              <span class="font-extrabold">{{ numberFormat(totalIncome) }}</span>
            </h3>
            <cash-list :data="income.Paycheck" index="Income" />
          </div>
          <div>
            <h3 class="w-322px flex justify-between pe-4 text-2xl">
              {{ t("main.Expenses") }}
              <span class="font-extrabold">{{ numberFormat(totalExpenses) }}</span>
            </h3>
            <div class="grid auto-cols-fr gap-12 md:grid-cols-2">
              <cash-list v-for="(item, index) in expenses" :key="index" :data="item" :index="index" />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
