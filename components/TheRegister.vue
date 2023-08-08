<script lang="ts" setup>
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'

const { t } = useI18n()
const router = useRouter()
const email = ref('')
const password = ref('')
const auth = getAuth()
function register() {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
    // Signed in
      const user = userCredential.user
      console.log(`User created${user} - ${auth.currentUser}`)
      // router.push('/')
    // ...
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      alert(`Error: ${errorCode} - ${errorMessage}`)
    // ..
    })
}
</script>

<template>
  <div class="flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
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
            {{ t('auth.alreadyRegistered') }} <a href="#" class="font-medium text-primary_dark hover:underline">Login here</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
