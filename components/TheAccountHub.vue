<script lang="ts" setup>
const isMenuShown = ref(false)
const target = ref(null)
const ignoreElRef = ref(null)
onClickOutside(target, () => isMenuShown.value = false, { ignore: [ignoreElRef] })
</script>

<template>
  <div
    class="relative flex items-center justify-between rounded-2 bg-#f9f9f9 p-4 transition transition-duration-200 dark:bg-#242424 md:bg-transparent md:p-2 dark:md:bg-transparent"
  >
    <p for="languageListBox" class="m-0 text-sm font-medium text-dark-900/60 md:hidden dark:text-[rgba(235,235,235,.6)]">
      Account
    </p>
    <button ref="ignoreElRef" type="button" i="tabler-user-circle" class="cursor-pointer bg-base_dark text-7 icon-btn" @click="isMenuShown = !isMenuShown" />

    <Transition>
      <Logout v-show="isMenuShown" ref="target" class="absolute right--4 top-16" />
    </Transition>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
