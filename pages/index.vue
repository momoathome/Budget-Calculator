<script lang="ts" setup>
const authUser = useCurrentUser()
await getCurrentUser()
</script>

<template>
  <div>
    <the-navbar />
    <Overview v-if="authUser" />
  </div>
</template>
