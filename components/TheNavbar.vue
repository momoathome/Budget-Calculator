<script setup lang="ts">
const { t } = useI18n()
const isMobileMenuActive = ref(false)
const isDropdownOpen = ref(false)
const authUser = useCurrentUser()
</script>

<template>
  <header class="box-shadow sticky left-0 top-0 z-10 h-70px flex justify-between bg-base px-4 lg:(static px-12) md:items-center">
    <div class="flex">
      <!-- Logo -->
      <nuxt-link
        to="/"
        class="h-full flex items-center text-3xl font-bold text-sky-400 no-underline animated animated-pulse animated-infinite animated-slower"
      >
        {{ t("global.title") }}
      </nuxt-link>
    </div>

    <button
      type="button" aria-label="mobile menu toggle" :class="{ 'is-active': isMobileMenuActive }"
      class="hamburger-toggle h-full border-none bg-transparent md:hidden" :aria-expanded="isMobileMenuActive"
      @click="isMobileMenuActive = !isMobileMenuActive"
    >
      <span class="hamburger-container" aria-hidden="true">
        <span class="hamb-line hamb-line-top" aria-hidden="true" />
        <span class="hamb-line hamb-line-middle" aria-hidden="true" />
        <span class="hamb-line hamb-line-bottom" aria-hidden="true" />
      </span>
    </button>

    <!-- Navigation -->
    <nav
      id="main-nav"
      class="fixed left-0 top-70px h-0 w-full flex-col overflow-hidden px-8 opacity-0 transition-all transition-duration-200 ease-in md:(static h-full w-auto flex flex-row overflow-initial px-0 opacity-100) <md:bg-base"
      :class="{ 'h-[calc(100dvh-70px)]! z-1000 flex opacity-100': isMobileMenuActive }"
    >
      <nuxt-link to="/" class="nav-item">
        {{ t("global.home") }}
      </nuxt-link>
      <nuxt-link v-if="authUser" to="/overview" class="nav-item">
        {{ t("global.overview") }}
      </nuxt-link>
      <nuxt-link to="/about" class="nav-item">
        {{ t("global.about") }}
      </nuxt-link>

      <!-- Dropdown -->
      <!-- <div
        class="group relative block h-52px flex-col cursor-pointer md:(h-full flex) nav-item hover:md:h-auto hover:<md:pb-0"
        :class="{ '<md:h-auto <md:pb-0': isDropdownOpen }" @click="isDropdownOpen = !isDropdownOpen"
      >
        <div class="flex items-center md:h-full" :class="{ '<md:pb-2.5': isDropdownOpen }">
          <span aria-haspopup="true">DropDown</span>
          <div i="tabler-caret-down" />
        </div>
        <div
          class="dropDown-shadow invisible flex flex-col opacity-0 transition md:(absolute left-0 top-65px z-1000 w-210px bg-base p-2) group-hover:md:visible group-hover:md:opacity-100"
          :class="{ '<md:visible! <md:opacity-100!': isDropdownOpen }" aria-label="submenu"
        >
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
      </div> -->

      <div class="flex flex-col gap-4 pt-4 md:(flex-row gap-0 p-0)">
        <!-- Language toggle -->
        <the-locale-toggle />
        <!-- Darkmode toggle -->
        <the-dark-toggle />
        <!-- Account Hub -->
        <the-account-hub />
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

/* Responsive */
@media (max-width: 768px) {

  .dropDown-shadow {
    box-shadow: none
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
