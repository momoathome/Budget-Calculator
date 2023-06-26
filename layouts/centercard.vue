<template>
  <div>
    <the-navbar />
    <!-- <code-stitch-navbar /> -->
    <!-- <daisy-u-i-navbar /> -->

    <div class="flex h-[calc(100vh-70px)] items-center justify-center">
      <div class="rounded-xl bg-light-100 border-1 border-opacity-25% shadow-md p-10 w-100 sm:w-125 lg:w-170 dark:bg-slate-800 dark:text-base_light">
        <slot />
      </div>
    </div>
    <div class="right-10 bottom-10 absolute">
      <nuxt-link to="/" class="text-primary text-4xl icon-btn">
        <div i="tabler-arrow-left" />
      </nuxt-link>
    </div>
  </div>
</template>
