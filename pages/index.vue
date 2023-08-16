<script lang="ts" setup>
const authUser = useCurrentUser()
const showLogin = ref(true)
</script>

<template>
  <the-navbar />

  <h1 class="flex justify-center text-6xl">
    Landing Page
  </h1>

  <div class="flex justify-center">
    <Login v-if="!authUser && showLogin" @show-register="showLogin = false" />
    <TheRegister v-if="!authUser && !showLogin" @show-login="showLogin = true" />
  </div>
</template>
