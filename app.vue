<script lang="ts" setup>
const router = useRouter()
const route = useRoute()
const authUser = useCurrentUser()

// reagiert auf Änderungen des authUsers
onMounted(() => {
  watch(authUser, (user, prevUser) => {
    if (prevUser && !user) {
      // user logged out
      router.push('/')
    }
    else if (user && typeof route.query.redirect === 'string') {
      // user logged in
      router.push(route.query.redirect)
    }
  })
})
</script>

<template>
  <div font="text">
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
