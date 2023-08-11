<script lang="ts" setup>
const authUser = useCurrentUser()
</script>

<template>
  <the-navbar />
  <Overview v-if="authUser" />
</template>
