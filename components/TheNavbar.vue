<script setup lang="ts">
const { toggle } = useDark()
const { locale: currentLocale, t } = useI18n()
const isMobileMenuActive = ref(false)
const isDropdownOpen = ref(false)
</script>

<template>
  <header class="flex h-70px px-4 box-shadow justify-between md:items-center lg:px-12 dark:bg-base dark:text-base_light">
    <div class="flex flex-1">
      <!-- Logo -->
      <nuxt-link to="/" class="flex font-bold h-full text-3xl text-sky-400 items-center no-underline">
        Snowowl
      </nuxt-link>
    </div>

    <button type="button" aria-label="mobile menu toggle" :class="{ 'is-active': isMobileMenuActive }" class="bg-transparent border-none h-full hamburger-toggle md:hidden" :aria-expanded="isMobileMenuActive" @click="isMobileMenuActive = !isMobileMenuActive">
      <span class="hamburger-container" aria-hidden="true">
        <span class="hamb-line hamb-line-top" aria-hidden="true" />
        <span class="hamb-line hamb-line-middle" aria-hidden="true" />
        <span class="hamb-line hamb-line-bottom" aria-hidden="true" />
      </span>
    </button>

    <!-- TODO active klasse setzen -->
    <!-- Navigation -->
    <nav class="bg-white flex flex-col h-0 w-full opacity-0 px-6 transition-all top-70px ease-in left-0 z-1000 transition-duration-200 main-nav absolute md:flex-row md:h-full md:w-auto md:opacity-100 md:px-0 md:transition-none md:static dark:bg-base">
      <nuxt-link to="/" class="nav-item">
        Home
      </nuxt-link>
      <nuxt-link to="/about" class="nav-item">
        {{ t("global.about") }}
      </nuxt-link>
      <a href="#" class="nav-item" target="_blank">Stackoverflow</a>
      <a href="#" class="nav-item" target="_blank">LinkedIn</a>

      <!-- Dropdown -->
      <div class="cursor-pointer flex-col h-52px relative nav-item block group md:flex md:h-full hover:md:h-auto hover:<md:pb-0" :class="{ '<md:h-auto <md:pb-0': isDropdownOpen }" @click="isDropdownOpen = !isDropdownOpen">
        <div class="flex items-center md:h-full">
          <span aria-haspopup="true">DropDown</span>
          <div i="tabler-caret-down" />
        </div>
        <div class="flex flex-col dropDown-shadow invisible hidden md:bg-white md:p-2 md:top-65px md:left-0 md:w-210px md:absolute dark:md:bg-base group-hover:md:flex group-hover:md:visible" :class="{ '<md:visible! <md:flex!': isDropdownOpen }" aria-label="submenu">
          <nuxt-link to="" class="nav-dropdown" target="_blank">
            Dropdown
          </nuxt-link>
          <nuxt-link to="" class="nav-dropdown" target="_blank">
            Dropdown
          </nuxt-link>
          <nuxt-link to="" class="nav-dropdown" target="_blank">
            Dropdown
          </nuxt-link>
        </div>
      </div>

      <a href="https://codepen.io/momoathome/pen/JjMOxEP" class="nav-item" target="_blank">Codepen</a>

      <div class="flex flex-col pt-3 gap-3 md:flex-row md:p-0 md:gap-0">
        <!-- Language toggle -->
        <div class="flex bg-#f9f9f9 rounded-2 transition transition-duration-200 language justify-between items-center md:bg-transparent <md:py-3 <md:px-3 dark:bg-#242424 dark:md:bg-transparent">
          <p for="languageListBox" class="font-medium m-0 text-sm text-dark-900/60 md:hidden dark:text-dark_nav_accent">
            Translation
          </p>
          <div class="flex">
            <label for="languageListBox" class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 8l6 6m-7 0l6-6l2-3M2 5h12M7 2h1m14 20l-5-10l-5 10m2-4h6" /></svg>
            </label>
            <select
              id="languageListBox"
              v-model="currentLocale"
              role="listbox"
              tabindex="0"
              aria-labelledby="languageListBox"
              class="bg-transparent border-none rounded-lg list p-0.3rem md:p-2 md:text-18px"
            >
              <option
                v-for="locale of availableLocales"
                :key="locale"
                :value="locale"
                role="option"
              >
                {{ locale }}
              </option>
            </select>
          </div>
        </div>

        <!-- Darkmode toggle -->
        <div class="flex bg-#f9f9f9 rounded-2 py-3 px-3 transition transition-duration-200 justify-between items-center md:bg-transparent dark:bg-#242424 dark:md:bg-transparent">
          <p for="languageListBox" class="font-medium m-0 text-sm text-dark-900/60 md:hidden dark:text-dark_nav_accent">
            Appearence
          </p>
          <button id="darkModeToggle" type="button" class="flex text-7 icon-btn items-center" @click="toggle()">
            <div i="tabler-sun dark:tabler-moon" />
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.box-shadow {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.dropDown-shadow {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

@media (min-width: 768px) {

  .language::before {
    width: 1px;
    height: 24px;
    background-color: rgba(18, 18, 18, .3);
    content: "";
    margin-right: 8px;
  }
  .language::after {
    width: 1px;
    height: 24px;
    background-color: rgba(18, 18, 18, .3);
    content: "";
    margin-left: 2px;
  }

  .dark .language::before {
    background-color: var(--dark-nav-accent);
  }

  .dark .language::after {
    background-color: var(--dark-nav-accent);
  }

}
/* Responsive */
@media (max-width: 768px) {

  .dropDown-shadow {
    box-shadow: none
  }
  .hamburger-toggle.is-active ~ .main-nav {
    height: calc(100dvh - 70px);
    opacity: 1;
    overflow-y: hidden;
  }

  /* Hamburger Menu */
  .hamburger-container {
    display: block;
    width: 30px;
    height: 20px;
    position: relative;
  }

  .hamb-line {
    background: var(--base);
    position: absolute;
    left: 0;
    padding: 0;
    width: 30px;
    height: 4px;
    border-radius: 4px;
    transition: all 0.4s;
  }

  .dark .hamb-line {
    background: var(--base-light);
  }

  .hamb-line-top {
    top: 0;
    width: 22px;
  }
  .hamb-line-middle {
    top: 8px;
    width: 16px;
  }
  .hamb-line-bottom {
    bottom: 0;
  }

  .hamburger-toggle.is-active .hamb-line-top {
    transform: rotate(45deg);
    transform-origin: 5%;
    width: 25.5px;
  }
  .hamburger-toggle.is-active .hamb-line-middle {
    transform: translateX(-24px);
    background-color: transparent;
  }
  .hamburger-toggle.is-active .hamb-line-bottom {
    transform-origin: 5%;
    transform: rotate(-45deg);
    width: 25.5px;
  }
}
</style>
