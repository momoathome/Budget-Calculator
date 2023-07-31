<script lang="ts" setup>
const { locale: currentLocale } = useI18n()
</script>

<template>
  <div
    class="language_select flex items-center justify-between rounded-2 bg-#f9f9f9 px-3 py-3 transition transition-duration-200 dark:bg-#242424 md:bg-transparent dark:md:bg-transparent">
    <p for="languageListBox" class="m-0 text-sm font-medium text-dark-900/60 md:hidden dark:text-dark_nav_accent">
      Translation
    </p>
    <div class="flex">
      <label for="languageListBox" class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m5 8l6 6m-7 0l6-6l2-3M2 5h12M7 2h1m14 20l-5-10l-5 10m2-4h6" />
        </svg>
      </label>
      <select id="languageListBox" v-model="currentLocale" role="listbox" tabindex="0" aria-labelledby="languageListBox"
        class="list rounded-lg border-none bg-base p-0.3rem md:p-2 md:text-18px">
        <option v-for="locale of availableLocales" :key="locale" :value="locale" role="option">
          {{ locale }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 768px) {

  .language_select::before {
    width: 1px;
    height: 24px;
    background-color: var(--nav-divider);
    content: "";
    margin-right: 8px;
    margin-left: 4px;
  }

  .language_select::after {
    width: 1px;
    height: 24px;
    background-color: var(--nav-divider);
    content: "";
    margin-left: 2px;
  }

}
</style>
