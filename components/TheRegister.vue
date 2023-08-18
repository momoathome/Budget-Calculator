<script lang="ts" setup>
import type { DatabaseReference } from 'firebase/database'
import { ref as dbRef, getDatabase, push, update } from 'firebase/database'

import { createUserWithEmailAndPassword } from 'firebase/auth'

const emit = defineEmits(['showLogin'])
const { t } = useI18n()
const router = useRouter()
const email = ref('')
const password = ref('')
const auth = useFirebaseAuth()!
const firebaseApp = useFirebaseApp()
const db = getDatabase(firebaseApp)

function register() {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
    // Signed in
      const user = userCredential.user
      /* TODO: succesfully registerd message */
      // console.log(`User created${user.email} - ${authUser.currentUser}`)

      const userRef = dbRef(db, `users/${user.uid}`)
      setInitialUserData(userRef)

      setTimeout(() => {
        router.push('/overview')
      }, 1000)
    // ...
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      alert(`Error: ${errorCode} - ${errorMessage}`)
    // ..
    })
}

function setInitialUserData(userRef: DatabaseReference): void {
  const newPostKey = push(userRef).key!

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

const onShowLogin = () => emit('showLogin')
</script>

<template>
  <div class="flex flex-col items-center justify-center px-6 py-8 lg:py-0">
    <div class="w-full rounded-lg shadow-elevation-7 md:mt-0 sm:max-w-md dark:bg-base">
      <div class="p-6 space-y-4 sm:p-8 md:space-y-6">
        <h1 class="m-0 text-xl font-bold md:text-2xl">
          {{ t('auth.register') }}
        </h1>
        <form class="space-y-4 md:space-y-6" @submit.prevent="register">
          <div>
            <label for="email" class="mb-2 text-sm font-medium">{{ t('auth.email') }}</label>
            <span class="required-dot text-red-500"> *
            </span>
            <input id="email" v-model="email" type="email" name="email" class="form-input" placeholder="E-Mail" required>
          </div>
          <div>
            <label for="password" class="mb-2 text-sm font-medium">{{ t('auth.password') }}</label>
            <span class="required-dot text-red-500"> *
            </span>
            <input id="password" v-model="password" type="password" name="password" placeholder="••••••••" class="form-input" required>
          </div>
          <div>
            <label for="confirm-password" class="mb-2 text-sm font-medium">{{ t('auth.confirm') }}</label>
            <span class="required-dot text-red-500"> *
            </span>
            <input id="confirm-password" type="password" name="confirm-password" placeholder="••••••••" class="form-input" required>
          </div>
          <button type="submit" class="btn">
            {{ t('auth.register') }}
          </button>
          <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            {{ t('auth.alreadyRegistered') }} <span class="cursor-pointer font-medium text-primary_dark hover:underline" @click="onShowLogin">Login here</span>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
