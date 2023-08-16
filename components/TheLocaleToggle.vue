<script lang="ts" setup>
const { locale: currentLocale } = useI18n()
const isMenuShown = ref(false)
const target = ref(null)
const ignoreElRef = ref(null)
onClickOutside(target, () => isMenuShown.value = false, { ignore: [ignoreElRef] })
</script>

<template>
  <div class="w-full md:flex">
    <div
      class="language_select relative flex items-center justify-between rounded-2 bg-#f9f9f9 p-4 transition transition-duration-200 dark:bg-#242424 md:bg-transparent md:p-0 dark:md:bg-transparent"
    >
      <p for="languageListBox" class="m-0 text-sm font-medium text-dark-900/60 md:hidden dark:text-[rgba(235,235,235,.6)]">
        Translation
      </p>

      <div class="relative">
        <button ref="ignoreElRef" type="button" class="flex cursor-pointer items-center px-1 icon-btn" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label" @click="isMenuShown = !isMenuShown">
          <svg xmlns="http://www.w3.org/2000/svg" class="" width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m5 8l6 6m-7 0l6-6l2-3M2 5h12M7 2h1m14 20l-5-10l-5 10m2-4h6"
            />
          </svg>
        </button>
        <transition>
          <div v-show="isMenuShown" ref="target" class="absolute left--2 top-10 z-10 flex flex-col items-center justify-center">
            <div class="w-full rounded-lg bg-base shadow-elevation-7 sm:max-w-md">
              <ul class="max-h-56 w-full py-2 sm:text-sm" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-1">
                <li v-for="locale of availableLocales" :key="locale" class="relative flex cursor-pointer py-2 pr-10 ps-4 text-size-base font-600 hover:bg-list_divider" tabindex="0" role="option" @click="currentLocale = locale">
                  {{ locale }}

                  <span v-if="currentLocale === locale" class="absolute right-2 top-6px h-5 w-5 flex items-center justify-end text-primary">
                    <svg class="w-full" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
    </div>
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

@media (min-width: 768px) {

  .language_select::before {
    width: 1px;
    height: 24px;
    background-color: var(--nav-divider);
    content: "";
    margin-right: 4px;
  }

  .language_select::after {
    width: 1px;
    height: 24px;
    background-color: var(--nav-divider);
    content: "";
    margin-left: 4px;
  }

}
</style>
