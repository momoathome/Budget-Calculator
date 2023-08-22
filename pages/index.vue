<script lang="ts" setup>
const authUser = useCurrentUser()
const showLogin = ref(false)
const showRegister = ref(false)
const showGetStartedButton = ref(true)
</script>

<template>
  <the-navbar />

  <div class="h-[calc(100dvh-70px)] bg-white dark:bg-base">
    <div class="relative isolate px-6 pt-14 lg:px-8">
      <div class="absolute inset-x-0 transform-gpu overflow-hidden blur-3xl -top-40 -z-10 sm:-top-80" aria-hidden="true">
        <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] rotate-[30deg] from-[#ff80b5] to-[#9089fc] bg-gradient-to-tr opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] -translate-x-1/2" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
      <div class="mx-auto max-w-2xl py-32 lg:py-56 sm:py-48">
        <div class="text-center">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-gray-200">
            Budget Rechner
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-base_dark">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
          </p>
          <div class="mt-10 flex items-center justify-center">
            <button v-if="showGetStartedButton" type="button" class="btn" @click="showLogin = true, showGetStartedButton = false">
              Get started
            </button>
          </div>
        </div>

        <div class="relative flex justify-center">
          <div class="absolute mt-10">
            <TransitionGroup name="test">
              <Login v-if="!authUser && showLogin" @show-register="showLogin = false, showRegister = true" />
              <TheRegister v-if="!authUser && showRegister" @show-login="showRegister = false, showLogin = true" />
            </TransitionGroup>
          </div>
        </div>
      </div>
      <div class="absolute inset-x-0 top-[calc(100%-13rem)] transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)] -z-10" aria-hidden="true">
        <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] from-[#ff80b5] to-[#9089fc] bg-gradient-to-tr opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] -translate-x-1/2" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
    </div>
  </div>
</template>

<style scopep>
.test-move,
.test-enter-active,
.test-leave-active {
  transition: all .35s ease;
}

.test-enter-to,
.test-leave-from {
  opacity: 1;
  transform: scale(1);
}

.test-enter-from,
.test-leave-to {
  opacity: 0;
  transform: scale(0.6);
}

/* ensure leaving items are taken out of layout flow so that moving animations can be calculated correctly. */
.test-leave-active {
  position: absolute;
}
</style>
