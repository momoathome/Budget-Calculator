export default function useLocale(fallback = 'Deutsch'): Ref<string> {
  const preferredLanguages = $(usePreferredLanguages())

  const locale = preferredLanguages.find(language => availableLocales.includes(language)) // try to find exact match
   ?? preferredLanguages.find(language => availableLocales.includes(language.slice(0, 2)))?.slice(0, 2) // try to find match with only language code
   ?? fallback // fallback

  return useLocalStorage('locale', locale)
}
