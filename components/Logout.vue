<script lang="ts" setup>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

const { t } = useI18n()
const isLoggedIn = ref(false)
const auth = getAuth()

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user)
      isLoggedIn.value = true

    else
      isLoggedIn.value = false
  })
})
function handleSignOut() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log('Sign-out successful.')
    })
    .catch((error) => {
      // An error happened.
      console.log(error)
    })
}
</script>

<template>
  <div class="flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
    <div class="w-full rounded-lg shadow-elevation-7 md:mt-0 sm:max-w-md dark:bg-base">
      <div class="p-6 space-y-4 sm:p-8 md:space-y-6">
        <div class="flex items-center gap-2">
          <div i="tabler-user-circle" class="text-4xl" />
          <p class="m-0 font-bold">
            mknoll1901@gmail.com
          </p>
        </div>
        <div class="flex justify-end">
          <button v-if="isLoggedIn" class="bg-red-800 btn hover:bg-red-600" @click="handleSignOut">
            {{ t('auth.logout') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
