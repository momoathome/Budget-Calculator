export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  function reset() {
    count.value = 0
  }

  function double() {
    count.value *= 2
  }

  return { count, increment, reset, decrement, double }
})
