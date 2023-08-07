<script lang="ts" setup>
/* Darkmode toggle Function with Nuxtjs/color-mode */
/* export default function useDark() {
  const colorMode = useColorMode()

  function toggle(dark?: boolean): void {
    if (colorMode.unknown)
      return

    if (dark !== undefined)
      colorMode.preference = dark ? 'dark' : 'light'
    else
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }

  const value = $computed(() => colorMode.value)
  const isDark = $computed(() => value === 'dark')
  const preference = $computed(() => colorMode.preference)

  return { toggle, value, isDark, preference }
} */

/* new animated Darkmode toggle Function from antfu */
const isDark = useDark()
function toggleDark(event: MouseEvent) {
  // @ts-expect-error experimental API
  const isAppearanceTransition = document.startViewTransition
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!isAppearanceTransition) {
    isDark.value = !isDark.value
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )
  // @ts-expect-error: Transition API
  const transition = document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  })
  transition.ready
    .then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
      document.documentElement.animate(
        {
          clipPath: isDark.value
            ? [...clipPath].reverse()
            : clipPath,
        },
        {
          duration: 400,
          easing: 'ease-out',
          pseudoElement: isDark.value
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      )
    })
}
</script>

<template>
  <div
    class="flex items-center justify-between rounded-2 bg-#f9f9f9 px-3 py-3 transition transition-duration-200 dark:bg-#242424 md:bg-transparent dark:md:bg-transparent"
  >
    <p for="languageListBox" class="m-0 text-sm font-medium text-dark-900/60 md:hidden dark:text-[rgba(235,235,235,.6)]">
      Appearence
    </p>
    <button
      id="darkModeToggle" type="button" title="toggle color Scheme" class="flex items-center text-7 icon-btn"
      @click="toggleDark"
    >
      <div i="tabler-sun dark:tabler-moon" />
    </button>
  </div>
</template>
