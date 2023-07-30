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
    ['btn', 'px-4 py-2 font-medium text-sm tracking-wide capitalize transition-colors text-white transform bg-primary rounded-md border-none no-underline hover:bg-primary_light focus:( outline-none ring ring-teal-300 ring-opacity-80 )'],
    ['icon-btn', 'p-0 bg-transparent inline-block select-none border-none opacity-75 transition duration-200 ease-in-out hover:opacity-100'],
    ['list', 'list-disc list-inside'],
    ['flex-center', 'flex items-center justify-center'],
    ['grid-center', 'grid place-items-center'],
    ['nav-item', 'flex font-600 py-3 text-1.125rem <lg:text-1rem <md:border-b-solid border-b-dark-900/15 dark:border-b-dark_nav_accent_divider <md:border-b-1 transition transition-duration-200 md:px-3 md:h-full md:items-center hover:text-primary'],
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
      primary_light: 'var(--primary-light)',
      secondary: 'var(--secondary)',
      secondary_dark: 'var(--secondary-dark)',
      dark_nav_accent: 'var(--dark-nav-accent)',
      dark_nav_accent_divider: 'var(--dark-nav-accent-divider)',
      divider: 'var(--divider)',
    },
  },
})
