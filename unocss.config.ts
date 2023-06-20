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

/* @unocss-include */

export default defineConfig({

  shortcuts: [
    ['btn', 'px-4 py-2 font-medium text-sm tracking-wide text-white capitalize transition-colors transform bg-primary rounded-md border-none no-underline hover:bg-primary_dark focus:( outline-none ring ring-teal-300 ring-opacity-80 )'],
    ['icon-btn', 'hover:text-violet-500 dark:hover:text-primary bg-transparent inline-block select-none border-none opacity-75 transition duration-200 ease-in-out hover:opacity-100'],
    ['list', 'list-disc list-inside'],
    ['flex-center', 'flex items-center justify-center'],
    ['grid-center', 'grid place-items-center'],
    ['nav-item', 'no-underline text-base dark:text-base_light flex h-full font-600 px-3 transition transition-duration-200 items-center hover:text-primary dark:hover:text-primary'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
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
      base_light: 'var(--base-light)',
      grey: 'var(--grey))',
      primary: 'var(--primary)',
      primary_dark: 'var(--primary-dark)',
      secondary: 'var(--secondary)',
    },
  },
})
