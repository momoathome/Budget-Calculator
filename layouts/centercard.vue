<template>
  <div>
    <the-navbar />
    <!-- <code-stitch-navbar /> -->
    <!-- <daisy-u-i-navbar /> -->

    <div class="mt-70px flex items-center justify-center">
      <div class="w-100 border-1 border-opacity-25% rounded-xl bg-secondary p-10 text-[rgb(181,205,245)] shadow-md lg:w-170 sm:w-125">
        <slot />
      </div>
    </div>
    <div class="absolute bottom-10 right-10">
      <nuxt-link to="/" class="text-4xl text-primary icon-btn">
        <div i="tabler-arrow-left" />
      </nuxt-link>
    </div>
  </div>
</template>
