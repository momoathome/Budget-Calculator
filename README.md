# Budget-Calculator by momoathome

Look at the [nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

## Summary

* [🚀 Quick start](#-quick-start)
* [✨ Features](#-features)
* [🤔 What's included](#-whats-included)
* [🛠️ Configurations](#️-configurations)
* [🌐 Localization](#-localization)
* [🖌️ Theme: Light and Dark](#️-theme-light-and-dark)
* [🧑‍💻 Development](#-development)
* [⚙️ Setup](#️-setup)
* [🏃‍♂️ Running in development mode](#️-running-in-development-mode)
* [💪 Building for production](#-building-for-production)
* [📝 Other scripts](#-other-scripts)

## 🚀 Quick start

1. **Get pnpm.**

    Use [pnpm](https://pnpm.io/) for package management. You can install it with the following command:

    ```bash
    npm install -g pnpm
    ```

2. **Create your own project.**

    Use this as a Template to create your own project:

    ```bash
    git clone "https://github.com/momoathome/Budget-Calculator.git"
    ```

3. **Start developing.**

    Install the dependencies and run the development server:

    ```bash
    cd budget-calculator
    pnpm install
    pnpm dev
    ```

    You may also want to check if there are any updates to the dependencies. Do so by running taze.

    ```bash
    pnpm taze
    ```

4. **Enjoy your new Budget-Calculator project!**

    Your site is now running at `http://localhost:3000`!

## ✨ Features

The Budget-Calculator uses the following technologies:

* [Nuxt 3](https://v3.nuxtjs.org/)
* [Vue 3](https://v3.vuejs.org/)
* [Vite](https://vitejs.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [ESLint](https://eslint.org/)
* [UnoCSS](https://uno.antfu.me)
* [Iconify](https://iconify.design/)
* [Animate](https://animate.style/)
* [Pinia](https://pinia.vuejs.org)
* [Vue Use](https://vueuse.org/)
* [Vue i18n](https://vue-i18n.intlify.dev/)
* [Vue Macros](https://vue-macros.sxzz.moe)

For more information on each of these, please refer to their respective documentation.

## 🤔 What's included

### 🛠️ Configurations

The Starter Template uses Nuxt 3 in SSR Mode by default, but you can use full static mode by uncommenting the marked line in the [nuxt.config.ts](nuxt.config.ts) file.

A default UnoCSS configuration is also provided in the [unocss.config.ts](unocss.config.ts) file.

Along with it is provided a dependency to use UnoCSS as an icon provider. The icons are served by Iconify. The default icon set is [Tabler Icons](https://tablericons.com/)

Also with it is provided a dependency to UnoCSS as the provider for [Animate](https://animate.style/) classes.

The default configuration for ESLint is based on Antfu's configuration (see [@antfu/eslint-config](https://www.npmjs.com/package/@antfu/eslint-config))

Also included are Vue Macros, for even more syntax sugar in Vue.
for more information see [vue-macros](https://vue-macros.sxzz.moe/macros/)

Pinia stores are stored in the `stores` directory, and are automatically registered for auto-import.

### 🌐 Localization

The Starter Template uses Vue i18n for localization. You can add as many locales as you want by creating a file in the `locales` directory, following the same scheme as the already provided files.

To interact with it, there are several files and composables available:

* `utils/locales.ts` is ran every time Nuxt reloads the project, and exports the list of locales available in the project. As you can see in it, locale files can be either `.yml`, `.yaml`, or `.json` files.
* `plugins/i18n.ts` is the Nuxt plugin that configures and loads Vue i18n with the available locales.
* `composables/useLocale.ts` is a composable that provides ref to the current preferred locale. This is where one can change the fallback locale (or the default locale to that matter, but it is not recommended and is more complicated). The current preferred locale is stored and persisted in locale storage. When the ref is updated, the locale storage is updated as well.
* `composables/useI18n.ts` is a composable that provides both the current locale, as well as the translation function. It is a wrapper around the `useLocale` and `useI18n` composable from Vue i18n. See [the documentation](https://vue-i18n.intlify.dev/guide/) for more information.

### 🖌️ Theme: Light and Dark

The Starter Template provides a basic theme system, with a light and a dark theme. The theme can be interacted with thanks to the `composables/useDark.ts` composable.

Along with the locale storage, the theme is also stored as a `dark` class on the `html` element. This allows you to use CSS variables to style your app, and have the theme change automatically.

## 🧑‍💻 Development

### ⚙️ Setup

When opening VSCode, you will be prompted to install recommended extensions. Do so and reload.

On your first reload, you will be prompted to disabled some extensions (such as built-in TypeScript language features). Do so and reload.

Install `pnpm` globally if it is not already installed:

```bash
npm install -g pnpm
```

Install dependencies:

```bash
pnpm i
```

### 🏃‍♂️ Running in development mode

```bash
pnpm dev
```

### 💪 Building for production

When in SSR mode:

```bash
pnpm build
```

The production output will be generated in the `.output/` directory.

When in static mode:

```bash
pnpm generate
```

The static output will be generated in the `.output/public/` directory.

### 📝 Other scripts

```bash
pnpm nuxi add <template> <name> # Add a new page, component, store, composable, etc.
pnpm lint --fix # Lint the code and fix errors, following the ESLint configuration
```
