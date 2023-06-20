<script setup lang="ts">
const { toggle } = useDark()
const { locale: currentLocale, t } = useI18n()
</script>

<template>
  <header class="flex h-70px px-12 gap-16 justify-between items-center dark:bg-base dark:text-base_light ">
    <div class="flex h-full flex-1">
      <nuxt-link to="/" class="flex font-bold h-full text-3xl text-sky-400 items-center no-underline">
        Snowowl
      </nuxt-link>
    </div>

    <input id="nav-check" type="checkbox" class="nav-check">
    <label id="label-nav-check" for="nav-check">
      <div class="hamb">
        <span class="hamb-line line1" />
        <span class="hamb-line line2" />
        <span class="hamb-line line3" />
      </div>
    </label>

    <nav class="flex h-full text-18px nav-links">
      <nuxt-link to="/" class="nav-item">
        Home
      </nuxt-link>
      <nuxt-link to="/about" class="nav-item">
        {{ t("global.about") }}
      </nuxt-link>
      <a href="#" class="nav-item" target="_blank">Stackoverflow</a>
      <a href="#" class="nav-item" target="_blank">LinkedIn</a>
      <a href="https://codepen.io/momoathome/pen/JjMOxEP" class="nav-item" target="_blank">Codepen</a>
    </nav>

    <div class="flex flex-row gap-2">
      <select
        id="languageListBox"
        v-model="currentLocale"
        role="listbox"
        tabindex="0"
        aria-labelledby="languageListBox"
        class="rounded-lg list py-1 px-2 dark:bg-base"
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

      <button type="button" class="text-8 icon-btn" @click="toggle()">
        <div i="tabler-sun dark:tabler-moon" />
      </button>
    </div>
  </header>
</template>

<style scoped>
header {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.nav-check {
  display: none;
}

.hamb {
  display: none;
}

/* Responsive */
@media (max-width: 767px) {
  header {
    padding-inline: 1rem;
    position: relative;
  }
  .nav-links {
    position: absolute;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    height: 0px;
    background-color: var(--grey);
    transition: all 0.3s ease-in;
    overflow-y: hidden;
    top: 0;
    left: 0;
    z-index: 25;
  }
  .nav-links > a {
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
    padding-inline: 1rem;
    padding-block: 0.5rem;
    height: max-content;
  }
  .nav-check:not(:checked) ~ .nav-links {
    height: 0px;
  }
  .nav-check:checked ~ .nav-links {
    height: 100vh;
    overflow-y: hidden;
  }

  /* Hamburger Menu */
  .hamb {
    display: block;
    cursor: pointer;
    margin: 0 auto;
    width: 30px;
    height: 20px;
    position: relative;
    z-index: 50;
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

  .line1 {
    top: 0;
    width: 22px;
  }
  .line2 {
    top: 8px;
    width: 16px;
  }
  .line3 {
    bottom: 0;
  }

  .nav-check:checked + label > .hamb > .line1 {
    transform: rotate(45deg);
    transform-origin: 5%;
    width: 25.5px;
  }
  .nav-check:checked + label > .hamb > .line2 {
    transform: translateX(-24px);
    background-color: transparent;
  }
  .nav-check:checked + label > .hamb > .line3 {
    transform-origin: 5%;
    transform: rotate(-45deg);
    width: 25.5px;
  }
}
</style>
