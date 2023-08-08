<script lang="ts" setup>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

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
  <TheNavbar />
  <button v-if="isLoggedIn" class="absolute right-8 top-24 bg-red-800 btn hover:bg-red-600" @click="handleSignOut">
    Logout
  </button>
  <div class="flex justify-center">
    <TheRegister />
    <TheSignIn />
  </div>
</template>
