<script lang="ts" setup>
import { ref as dbRef, getDatabase, push, remove, update } from 'firebase/database'

// TypeScript-Typ für eine einzelne Ausgabe (z.B. "Miete")
type ObjIncomeExpenseItem = {
  amount: number
  id: number
  text: string
}

// TypeScript-Typ für die gesamten Ausgaben und Einnahmen
type ObjIncomesExpenses = {
  [category: string]: {
    [key: string]: ObjIncomeExpenseItem
  }
}

// TypeScript-Typ für das gesamte User-Objekt
type ObjUser = {
  expenses: ObjIncomesExpenses
  incomes: ObjIncomesExpenses
}

// TypeScript-Typ für das gesamte Users-Objekt
type UsersObject = {
  [username: string]: ObjUser
}

// const user = useCurrentUser()
const firebaseApp = useFirebaseApp()
const db = getDatabase(firebaseApp)
const usersRef = dbRef(db, 'users')

function setInitialUserData() {
  remove(dbRef(db, 'users/user1'))

  push(dbRef(db, 'users/user1/incomes/Income'), {
    id: 0,
    text: 'Paycheck',
    amount: 1_000,
  })
  push(dbRef(db, 'users/user1/expenses/Utilities'), {
    id: 0,
    text: 'Handy',
    amount: 20,
  })
  push(dbRef(db, 'users/user1/expenses/Bills'), {
    id: 0,
    text: 'Miete',
    amount: 500,
  })
  push(dbRef(db, 'users/user1/expenses/Subscriptions'), {
    id: 0,
    text: 'Netflix',
    amount: 13,
  })
  push(dbRef(db, 'users/user1/expenses/Other Expenses'), {
    id: 0,
    text: 'Lebensmittel',
    amount: 200,
  })
  push(dbRef(db, 'users/user1/expenses/Savings'), {
    id: 0,
    text: 'Fester Wert',
    amount: 50,
  })
}

// setInitialUserData()

const { data: users, pending, promise: usersPromise } = useDatabaseObject<UsersObject>(usersRef)
await usersPromise.value

// console.log(users.value.user1)

const totalIncome = computed(() => getTotalAmount(users.value.user1.incomes))
const totalExpenses = computed(() => getTotalAmount(users.value.user1.expenses))
const totalBudget = computed(() => totalIncome.value - totalExpenses.value)
const totalIncomeValuePerKey = computed(() => getTotalValueForEachKey(users.value.user1.incomes))
const totalExpensesValuePerKey = computed(() => getTotalValueForEachKey(users.value.user1.expenses))

function getTotalAmount(object: ObjIncomesExpenses): number {
  if (!object)
    return 0

  return Object.values(object).reduce((total, categoryExpenses) => {
    return total + Object.values(categoryExpenses).reduce((sum, expense) => sum + expense.amount, 0)
  }, 0)

  // return Object.entries(object).reduce((totalValue, [, item]) => totalValue + item.amount, 0)
  // return Object.values(object).flatMap(array => array.map(val => val.amount)).reduce((sum, amount) => sum + amount, 0)
}

function getTotalValueForEachKey(object: ObjIncomesExpenses) {
  const totalValuePerKey: { [key: string]: number } = {}

  Object.entries(object).forEach(([key, value]) => {
    totalValuePerKey[key] = Object.values(value).reduce((sum, item) => sum + item.amount, 0)
  })

  return totalValuePerKey
}

function setIncomeOrExpense(object: ObjIncomeExpenseItem, index: string): void {
  if (index === 'Income')
    push(dbRef(db, 'users/user1/incomes/Income'), object)
    // incomes.Income.push(object)
  else push(dbRef(db, `users/user1/expenses/${index}`), object)
  // expenses[index].push(object)
}

function updateIncomeOrExpense(index: string) {
  update(dbRef(db, `users/user1/incomes/Income/${index}`), { text: 'new text' })
}

function deleteIncomeOrExpense(index: string, key: string) {
  if (index === 'Income')
    remove(dbRef(db, `users/user1/incomes/Income/${key}`))
  else remove(dbRef(db, `users/user1/expenses/${index}/${key}`))
}

function onSubmit(inputValue: string, inputAmount: number, index: string) {
  // Create new income or expense object
  const newIncomeOrExpense = {
    id: getRandomNumber(0, 1_000_000),
    text: inputValue,
    amount: inputAmount,
  }

  setIncomeOrExpense(newIncomeOrExpense, index)
}

const { locale: _, t } = useI18n()
</script>

<template>
  <the-navbar />
  <button class="absolute right-8 top-24 btn" @click="setInitialUserData()">
    reset
  </button>

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
          <cash-list
            v-for="(item, index) in users.user1.incomes" :key="index" :data="item" :index="index"
            :total-value-per-key="totalIncomeValuePerKey[index]" @submit="onSubmit" @delete="deleteIncomeOrExpense"
          />
        </div>
      </div>
      <div class="flex flex-col">
        <h3 class="mb-8 flex justify-center gap-8 text-2xl">
          {{ t("main.Expenses") }}
          <span class="font-extrabold">{{ numberFormat(totalExpenses) }}</span>
        </h3>
        <div class="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] justify-center gap-12">
          <cash-list
            v-for="(item, index) in users.user1.expenses" :key="index" :data="item" :index="index"
            :total-value-per-key="totalExpensesValuePerKey[index]" @submit="onSubmit" @delete="deleteIncomeOrExpense"
          />
        </div>
      </div>
    </div>
  </main>
  <pre>
    {{ users }}
  </pre>
</template>
