<script setup lang="ts">
const { locale: currentLocale, t } = useI18n()
const isMobileMenuActive = ref(false)
const isDropdownOpen = ref(false)
</script>

<template>
  <header class="box-shadow h-70px flex justify-between bg-base bg-base px-4 md:items-center lg:px-12">
    <div class="flex flex-1">
      <!-- Logo -->
      <nuxt-link to="/" class="h-full flex items-center text-3xl font-bold text-sky-400 no-underline animated animated-pulse animated-infinite animated-slower">
        Snowowl
      </nuxt-link>
    </div>

    <button type="button" aria-label="mobile menu toggle" :class="{ 'is-active': isMobileMenuActive }" class="hamburger-toggle h-full border-none bg-transparent md:hidden" :aria-expanded="isMobileMenuActive" @click="isMobileMenuActive = !isMobileMenuActive">
      <span class="hamburger-container" aria-hidden="true">
        <span class="hamb-line hamb-line-top" aria-hidden="true" />
        <span class="hamb-line hamb-line-middle" aria-hidden="true" />
        <span class="hamb-line hamb-line-bottom" aria-hidden="true" />
      </span>
    </button>

    <!-- Navigation -->
    <nav class="main-nav absolute left-0 top-70px z-1000 h-0 w-full flex flex-col px-6 opacity-0 transition-all transition-duration-200 ease-in md:static md:z-0 md:h-full md:w-auto md:flex-row md:px-0 md:opacity-100 md:transition-none">
      <nuxt-link to="/" class="nav-item">
        Home
      </nuxt-link>
      <nuxt-link to="/about" class="nav-item">
        {{ t("global.about") }}
      </nuxt-link>
      <a href="#" class="nav-item" target="_blank">Link3</a>
      <a href="#" class="nav-item" target="_blank">Link4</a>

      <!-- Dropdown -->
      <div class="group relative block h-52px flex-col cursor-pointer md:h-full nav-item md:flex hover:md:h-auto hover:<md:pb-0" :class="{ '<md:h-auto <md:pb-0': isDropdownOpen }" @click="isDropdownOpen = !isDropdownOpen">
        <div class="flex items-center md:h-full" :class="{ '<md:pb-2.5': isDropdownOpen }">
          <span aria-haspopup="true">DropDown</span>
          <div i="tabler-caret-down" />
        </div>
        <div class="dropDown-shadow invisible hidden flex flex-col md:absolute md:left-0 md:top-65px md:w-210px md:bg-base md:p-2 group-hover:md:visible group-hover:md:flex" :class="{ '<md:visible! <md:flex!': isDropdownOpen }" aria-label="submenu">
          <nuxt-link to="/about" class="nav-dropdown" target="_blank">
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

      <a href="" class="nav-item" target="_blank">Link6</a>

      <div class="flex flex-col gap-3 pt-3 md:flex-row md:gap-0 md:p-0">
        <!-- Language toggle -->
        <div class="language flex items-center justify-between transition transition-duration-200 <md:px-3 <md:py-3">
          <p for="languageListBox" class="m-0 text-sm font-medium text-dark-900/60 md:hidden dark:text-dark_nav_accent">
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
              class="list rounded-lg border-none bg-base p-0.3rem md:p-2 md:text-18px"
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
        <div class="flex items-center justify-between rounded-2 bg-#f9f9f9 px-3 py-3 transition transition-duration-200 dark:bg-#242424 md:bg-transparent dark:md:bg-transparent">
          <p for="languageListBox" class="m-0 text-sm font-medium text-dark-900/60 md:hidden dark:text-dark_nav_accent">
            Appearence
          </p>
          <button id="darkModeToggle" type="button" class="flex items-center text-7 icon-btn" @click="toggleDark">
            <div i="tabler-sun dark:tabler-moon" />
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.router-link-exact-active {
  color: var(--primary) !important;
}
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

  .dark .language::after, .dark .language::before {
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
    background: var(--base-dark);
    position: absolute;
    left: 0;
    padding: 0;
    width: 30px;
    height: 4px;
    border-radius: 4px;
    transition: all 0.4s;
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
