<script lang="ts" setup>
const { locale: currentLocale, t } = useI18n()
</script>

<template>
  <div>
    <the-navbar />

    <div class="h-[calc(100vh-70px)] flex-center flex-col gap-12">
      <main class="mt-24 flex flex-1 flex-col gap-20">
        <h1 class="text-center text-5xl font-extrabold">
          {{ t("global.title") }}
        </h1>

        <sample-component />
      </main>
    </div>
  </div>
</template>
