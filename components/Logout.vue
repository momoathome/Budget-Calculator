<script lang="ts" setup>
import { onAuthStateChanged, signOut } from 'firebase/auth'

const { t } = useI18n()
const router = useRouter()
const isLoggedIn = ref(false)
const auth = useFirebaseAuth()!
const authUser = useCurrentUser()

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
      router.push('/')
    })
    .catch((error) => {
      // An error happened.
      console.log(error)
    })
}
</script>

<template>
  <div class="flex flex-col items-center justify-center px-6 py-8 lg:py-0">
    <div class="w-full rounded-lg bg-base shadow-elevation-7 md:mt-0 sm:max-w-md">
      <div class="p-6 space-y-4 sm:p-8 md:space-y-6">
        <div class="flex items-center gap-2">
          <div i="tabler-user-circle" class="text-4xl" />
          <p class="m-0 font-bold">
            {{ authUser?.email }}
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
