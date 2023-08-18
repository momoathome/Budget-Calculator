<script lang="ts" setup>
import { ref as dbRef, getDatabase, push, remove, update } from 'firebase/database'

const authUser = useCurrentUser()
const firebaseApp = useFirebaseApp()
const db = getDatabase(firebaseApp)
const userRef = dbRef(db, `users/${authUser.value?.uid}`)

type IncomeExpenseItem = {
  amount: number
  text: string
}

function setIncomeOrExpense(object: IncomeExpenseItem, index: string): void {
  if (index === 'Income')
    push(dbRef(db, `users/${authUser.value?.uid}/incomes/Income`), object)
  else push(dbRef(db, `users/${authUser.value?.uid}/expenses/${index}`), object)
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

function resetUserData(): void {
  const newPostKey = push(userRef).key!
  remove(userRef)

  const initialUserData: any = {}
  initialUserData[`/incomes/Income/${newPostKey}`] = {
    text: 'Paycheck',
    amount: 1_000,
  }
  initialUserData[`/expenses/Bills/${newPostKey}`] = {
    text: 'Miete',
    amount: 500,
  }
  initialUserData[`/expenses/Living/${newPostKey}`] = {
    text: 'Lebensmittel',
    amount: 200,
  }
  initialUserData[`/expenses/Entertainment/${newPostKey}`] = {
    text: 'Netflix',
    amount: 11,
  }
  initialUserData[`/expenses/Other Expenses/${newPostKey}`] = {
    text: 'iCloud',
    amount: 2.5,
  }
  initialUserData[`/expenses/Savings/${newPostKey}`] = {
    text: 'Fester Wert',
    amount: 50,
  }

  update(userRef, initialUserData)
}
</script>

<template>
  <div class="absolute left-8 top-24 rounded-md px-8 py-6 shadow-lg dark:bg-secondary">
    <p class="m-0 mb-4 text-xl font-600">
      Test Menu
    </p>
    <div class="flex flex-col gap-4">
      <button class="btn" @click="resetUserData()">
        reset
      </button>
      <button class="btn" @click="onSubmit('Income', 'test', 500)">
        test Income
      </button>
      <button class="btn" @click="onSubmit('Bills', 'test', 50)">
        test Bills
      </button>
      <button class="btn" @click="onSubmit('Living', 'test', 25)">
        test Living
      </button>
      <button class="btn" @click="onSubmit('Savings', 'test', 25)">
        test Savings
      </button>
    </div>
  </div>
</template>
