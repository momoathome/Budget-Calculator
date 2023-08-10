<script lang="ts" setup>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const { t } = useI18n()
const router = useRouter()
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const auth = getAuth()
function register() {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
    // Signed in
      console.log(auth.currentUser)
    // router.push('/')
    // ...
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage.value = 'Invalid email address format.'
          break
        case 'auth/user-not-found':
          errorMessage.value = 'Die E-Mail-Adresse ist nicht registriert.'
          break
        case 'auth/wrong-password':
          errorMessage.value = 'incorrect password.'
          break
        default:
          errorMessage.value = 'Email or password is incorrect.'
          break
      }
    })
}
</script>

<template>
  <div class="flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
    <div class="w-full rounded-lg shadow-elevation-7 md:mt-0 sm:max-w-md dark:bg-base">
      <div class="p-6 space-y-4 sm:p-8 md:space-y-6">
        <p class="m-0 text-xl font-bold md:text-2xl">
          {{ t('auth.login') }}
        </p>
        <form class="space-y-4 md:space-y-6" @submit.prevent="register">
          <div>
            <label for="email" class="mb-2 text-sm font-medium">{{ t('auth.email') }}</label>
            <input id="email" v-model="email" type="email" name="email" class="form-input" placeholder="E-Mail" required>
          </div>
          <div>
            <label for="password" class="mb-2 text-sm font-medium">{{ t('auth.password') }}</label>
            <input id="password" v-model="password" type="password" name="password" placeholder="••••••••" class="form-input" required>
          </div>
          <span v-if="errorMessage" class="block font-600 text-red-800">{{ errorMessage }}</span>
          <div class="flex items-center justify-between">
            <a href="#" class="mb-0 text-sm font-medium text-primary_dark hover:underline">
              {{ t('auth.register') }}
            </a>
            <button type="submit" class="self-end btn">
              {{ t('auth.login') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
