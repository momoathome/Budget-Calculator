<script lang="ts" setup>
import { signInWithEmailAndPassword } from 'firebase/auth'

const emit = defineEmits(['showRegister'])
const { t } = useI18n()
const router = useRouter()
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const auth = useFirebaseAuth()!
function register() {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
    // Signed in
      router.push('/overview')
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

function testRegister() {
  signInWithEmailAndPassword(auth, 'giveheb472@v1zw.com', 'test1234')
    .then((data) => {
    // Signed in
      router.push('/overview')
    // ...
    })
}

const onShowRegister = () => emit('showRegister')
</script>

<template>
  <div class="flex flex-col items-center justify-center px-6 py-8 lg:py-0">
    <div class="w-full rounded-lg bg-base shadow-elevation-7 md:mt-0 sm:max-w-md">
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
            <span class="mb-0 cursor-pointer text-sm font-medium text-primary_dark hover:underline" @click="onShowRegister">
              {{ t('auth.register') }}
            </span>
            <button type="submit" class="self-end btn">
              {{ t('auth.login') }}
            </button>
          </div>
        </form>
        <div class="flex justify-end">
          <button type="button" class="bg-blueGray-5 btn hover:bg-blueGray-7" @click="testRegister">
            test Login
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
