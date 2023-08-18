import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
  // presetMini,
} from 'unocss'
import { presetExtra } from 'unocss-preset-extra'

/* @unocss-include */

export default defineConfig({

  shortcuts: [
    ['btn', 'px-4 py-2 font-medium text-sm tracking-wide transition-colors text-white bg-primary_dark rounded-md border-none no-underline hover:bg-primary_darker dark:text-base focus:( outline-none ring ring-base_dark )'],
    ['icon-btn', 'p-0 bg-transparent inline-block select-none border-none opacity-75 transition duration-200 ease-in-out hover:opacity-100'],
    ['form-input', 'w-full flex-1 appearance-none border border-gray-300 border-transparent rounded-lg bg-white dark:bg-secondary px-4 py-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-400'],
    ['list', 'list-disc list-inside'],
    ['cashlist-item', 'list-none shadow-md flex max-w-max mb-4 dark:bg-secondary'],
    ['flex-center', 'flex items-center justify-center'],
    ['grid-center', 'grid place-items-center'],
    ['nav-item', 'flex font-600 py-3 text-1.125rem <lg:text-1rem <md:border-b-solid border-b-dark-900/15 dark:border-b-nav_divider <md:border-b-1 transition transition-duration-200 md:px-3 md:h-full md:items-center hover:text-primary'],
    ['nav-dropdown', 'font-600 transition transition-duration-200 text-base_dark hover:text-primary px-3 first-of-type:pb-2.5 not-first-of-type:py-2.5 md:px-5 md:py-1.5'],
  ],
  details: true,
  presets: [
    presetUno(),
    presetAttributify(),
    presetExtra(),
    presetIcons({
      scale: 1,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(),
    presetWebFonts({
      provider: 'bunny',
      fonts: {
        display: 'Red Hat Display',
        text: 'Red Hat Text',
        mono: 'JetBrains Mono',
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  rules: [
    [/^text-(.*)$/, ([, c], { theme }) => {
      if (theme.colors[c])
        return { color: theme.colors[c] }
    }],
  ],
  theme: {
    colors: {
      base: 'var(--base)',
      base_dark: 'var(--base-dark)',
      primary: 'var(--primary)',
      primary_dark: 'var(--primary-dark)',
      primary_darker: 'var(--primary-darker)',
      primary_darkerer: 'var(--primary-darkerer)',
      primary_darkest: 'var(--primary-darkest)',
      primary_light: 'var(--primary-light)',
      secondary: 'var(--secondary)',
      secondary_dark: 'var(--secondary-dark)',
      nav_divider: 'var(--nav-divider)',
      list_divider: 'var(--list-divider)',
    },
  },
})
