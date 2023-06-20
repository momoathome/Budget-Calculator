<script lang="ts" setup>
const { locale: currentLocale, t } = useI18n()
</script>

<template>
  <div>
    <the-navbar />

    <div class="flex-center flex-col h-[calc(100vh-70px)] gap-12 dark:bg-base">
      <main class="flex flex-col flex-1 mt-24 gap-20">
        <h1 class="font-extrabold text-6xl dark:text-base_light">
          {{ t("main.title") }} <span class="font-extrabold text-6xl">Snowowl</span>
        </h1>

        <sample-component />
      </main>

      <hexa-component />
    </div>
  </div>
</template>
