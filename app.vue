<script lang="ts" setup>
const router = useRouter()
const route = useRoute()
const authUser = useCurrentUser()

// reagiert auf Änderungen des authUsers
onMounted(() => {
  watch(authUser, (currentUser, prevUser) => {
    if (prevUser && !currentUser) {
      // user logged out
      router.push('/')
    }
    else if (currentUser && typeof route.query.redirect === 'string') {
      // user logged in
      router.push(route.query.redirect)
    }
  })
})
</script>

<template>
  <div font="text" class="min-h-100dvh flex flex-col">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
