<script lang="ts" setup>
const authUser = useCurrentUser()
</script>

<template>
  <TheNavbar />
  <Overview v-if="authUser" />
  <TheFooter />
</template>
