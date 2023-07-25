<script lang="ts" setup>
const { locale: currentLocale, t } = useI18n()

const income = {
  Paycheck: 2_000,
}
const expenses = {
  Utilities: {
    Handy: 25,
    Internet: 16,
    Strom: 36,
    Gez: 12.5,
  },
  Bills: {
    Miete: 250,
    Auto_Kredit: 210,
    Auto_Versicherung: 50,
    Private_Haftpflicht: 5,
  },
  Other_Expenses: {
    Lebensmittel: 200,
    Benzin: 150,
    Netflix: 13,
    Amazon: 9,
  },
  Savings: {
    fixed_amount: 50,
  },
}
</script>

<template>
  <div>
    <the-navbar />

    <div class="flex-center flex-col gap-12">
      <main class="mt-16 flex flex-1 flex-col gap-8 lg:gap-20">
        <div class="flex flex-col items-center">
          <div class="w-max">
            <h1 class="m-0 text-2xl">
              {{ t("main.Budget") }}
            </h1>
            <h2 class="m-0 text-6xl font-extrabold">
              0,00€
            </h2>
          </div>
        </div>

        <div class="flex flex-col justify-center gap-20 px-6 lg:flex-row">
          <div>
            <h3 class="flex justify-between gap-8 pe-4 text-2xl">
              {{ t("main.Income") }}
              <span class="font-extrabold">2.000,00 €</span>
            </h3>
            <cash-list :data="income" index="Income" />
          </div>
          <div>
            <h3 class="w-322px flex justify-between pe-4 text-2xl">
              {{ t("main.Expenses") }}
              <span class="font-extrabold">1.000,00 €</span>
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
