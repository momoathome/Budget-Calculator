<script lang="ts" setup>
import { ref as dbRef, getDatabase, push, remove, set, update } from 'firebase/database'

type IncomeExpenseItem = {
  amount: number
  text: string
}
type IncomeExpenseCategory = {
  [category: string]: {
    [key: string]: IncomeExpenseItem
  }
}
type FirebaseUser = {
  [key: string]: IncomeExpenseCategory
}
type UserObject = {
  uid: string
  data: FirebaseUser
  totalIncome: number
  totalExpenses: number
  totalBudget: number
  totalIncomeValuePerKey: { [key: string]: number }
  totalExpensesValuePerKey: { [key: string]: number }
}
const authUser = useCurrentUser()
const firebaseApp = useFirebaseApp()
const db = getDatabase(firebaseApp)
const userRef = dbRef(db, `users/${authUser.value?.uid}`)

function setInitialUserData() {
  /*
    TODO: remove the remove function when reset is not needed anymore
    TODO: set Config in DB and to true or false to determine if initial data should be set
  */

  remove(dbRef(db, `users/${authUser.value?.uid}`))

  set(dbRef(db, `users/${authUser.value?.uid}`), {
    incomes: {
      Income: {
        'EU-Income-Test': {
          text: 'Paycheck',
          amount: 1_000,
        },
      },
    },
    expenses: {
      'Bills': {
        'EU-Expenses-Bills-Test': {
          text: 'Miete',
          amount: 500,
        },
      },
      'Living': {
        'EU-Expenses-Living-Test': {
          text: 'Lebensmittel',
          amount: 200,
        },
      },
      'Entertainment': {
        'EU-Expenses-Ente-Test': {
          text: 'Netflix',
          amount: 13,
        },
      },
      'Other Expenses': {
        'EU-Expenses-Other-Test': {
          text: 'Verein',
          amount: 20,
        },
      },
      'Savings': {
        'EU-Expenses-Savings-Test': {
          text: 'Fester Wert',
          amount: 50,
        },
      },
    },
  })
}
// setInitialUserData()

const { data: users, pending, promise: usersPromise } = useDatabaseObject<FirebaseUser>(userRef)
await usersPromise.value

const user: UserObject = reactive({
  uid: authUser.value?.uid,
  data: computed(() => users.value),
  totalIncome: computed(() => getTotalAmount(user.data.incomes)),
  totalExpenses: computed(() => getTotalAmount(user.data.expenses)),
  totalBudget: computed(() => user.totalIncome - user.totalExpenses),
  totalIncomeValuePerKey: computed(() => getTotalValuePerKey(user.data.incomes)),
  totalExpensesValuePerKey: computed(() => getTotalValuePerKey(user.data.expenses)),
})

function getTotalAmount(object: IncomeExpenseCategory): number {
  if (!object)
    return 0

  return Object.values(object).reduce((total, categoryExpenses) => {
    return total + Object.values(categoryExpenses).reduce((sum, expense) => sum + expense.amount, 0)
  }, 0)
}

function getTotalValuePerKey(object: IncomeExpenseCategory) {
  const totalValuePerKey: { [key: string]: number } = {}

  Object.entries(object).forEach(([key, value]) => {
    totalValuePerKey[key] = Object.values(value).reduce((sum, item) => sum + item.amount, 0)
  })

  return totalValuePerKey
}

function setIncomeOrExpense(object: IncomeExpenseItem, index: string): void {
  if (index === 'Income')
    push(dbRef(db, `users/${user.uid}/incomes/Income`), object)
  else push(dbRef(db, `users/${user.uid}/expenses/${index}`), object)
}

function updateIncomeOrExpense(object: IncomeExpenseItem, index: string, key: string): void {
  if (index === 'Income')
    update(dbRef(db, `users/${user.uid}/incomes/${index}/${key}`), object)
  else update(dbRef(db, `users/${user.uid}/expenses/${index}/${key}`), object)
}

function deleteIncomeOrExpense(index: string, key: string): void {
  if (index === 'Income')
    remove(dbRef(db, `users/${user.uid}/incomes/${index}/${key}`))
  else remove(dbRef(db, `users/${user.uid}/expenses/${index}/${key}`))
}

function createIncomeExpenseItem(text: string, amount: number): IncomeExpenseItem {
  const newIncomeExpenseItem = {
    text,
    amount,
  }

  return newIncomeExpenseItem
}

function onSubmit(index: string, inputValue: string, inputAmount: number) {
  const newIncomeExpenseItem = createIncomeExpenseItem(inputValue, inputAmount)
  setIncomeOrExpense(newIncomeExpenseItem, index)
}
function onUpdate(index: string, inputValue: string, inputAmount: number, key: string) {
  const newIncomeExpenseItem = createIncomeExpenseItem(inputValue, inputAmount)
  updateIncomeOrExpense(newIncomeExpenseItem, index, key)
}
function onDelete(index: string, key: string) {
  deleteIncomeOrExpense(index, key)
}

const { locale: _, t } = useI18n()
</script>

<template>
  <!-- eslint-disable vue/no-extra-parens -->

  <button class="absolute right-8 top-24 btn" @click="setInitialUserData()">
    reset
  </button>
  <button class="absolute right-8 top-34 btn" @click="onSubmit('Living', 'test', 20)">
    testValues
  </button>

  <main flex="~ 1 col" gap="8 lg:20" m="t-16">
    <div class="flex flex-col items-center">
      <div class="w-max">
        <h1 class="m-0 text-2xl">
          {{ t("main.budget") }}
        </h1>
        <h2 class="m-0 text-6xl font-extrabold">
          {{ numberFormat(user.totalBudget) }}
        </h2>
      </div>
    </div>

    <div class="flex flex-col gap-20 px-6 xl:px-12">
      <div class="flex flex-col">
        <h3 class="mb-8 flex justify-center gap-8 text-2xl">
          {{ t("main.income") }}
          <span class="font-extrabold">{{ numberFormat(user.totalIncome) }}</span>
        </h3>
        <div class="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] justify-center gap-12">
          <income-expense-list
            v-for="(item, key) in user.data.incomes" :key="key" :data="item" :category="(key as string)"
            :total-value-per-key="user.totalIncomeValuePerKey[key]" @update="onUpdate" @submit="onSubmit" @delete="onDelete"
          />
        </div>
      </div>

      <div class="flex flex-col">
        <h3 class="mb-8 flex justify-center gap-8 text-2xl">
          {{ t("main.expenses") }}
          <span class="font-extrabold">{{ numberFormat(user.totalExpenses) }}</span>
        </h3>
        <div class="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] justify-center gap-12">
          <income-expense-list
            v-for="(item, key) in user.data.expenses" :key="key" :data="item" :category="(key as string)"
            :total-value-per-key="user.totalExpensesValuePerKey[key]" @update="onUpdate" @submit="onSubmit" @delete="onDelete"
          />
        </div>
      </div>
    </div>
  </main>
</template>
