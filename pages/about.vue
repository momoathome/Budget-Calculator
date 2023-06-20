<script lang="ts" setup>
const { t } = useI18n()

definePageMeta({
  layout: 'centercard',
})

useHead({
  title: `${t('global.about')} • Snowowl`,
})
</script>

<template>
  <div>
    <h1 class="text-center">
      {{ t("about.title") }}
    </h1>

    <p>{{ t("about.summary") }}</p>

    <ul list>
      <li>Nuxt 3</li>
      <li>Vue 3</li>
      <li>Vite</li>
      <li>Typescript</li>
      <li>ESLint</li>
      <li>UnoCSS</li>
      <li>Iconify</li>
      <li>Pinia</li>
      <li>Vue Use</li>
      <li>Vue-i18n</li>
      <li>Vue Macros</li>
    </ul>

    <p class="mt-5">
      {{ t("about.config") }}
    </p>
  </div>
</template>
