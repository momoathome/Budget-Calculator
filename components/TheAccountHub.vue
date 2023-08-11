<script lang="ts" setup>
const showLogin = ref(false)
/* VueUse Function */
</script>

<template>
  <div
    class="flex items-center justify-between rounded-2 bg-#f9f9f9 p-4 transition transition-duration-200 dark:bg-#242424 md:bg-transparent md:p-2 dark:md:bg-transparent"
  >
    <p for="languageListBox" class="m-0 text-sm font-medium text-dark-900/60 md:hidden dark:text-[rgba(235,235,235,.6)]">
      Account
    </p>
    <div i="tabler-user-circle" class="bg-base_dark text-7 icon-btn" />

    <!-- On Hover over Icon soll SignIn Component erscheinen -->
    <!-- <TheSignIn /> -->
  </div>
</template>
