<script lang="ts" setup>
const store = useCounterStore()
const { count } = storeToRefs(store)
const { increment, decrement, reset, double } = store
</script>

<template>
  <div class="rounded-xl bg-secondary shadow-md dark:bg-secondary_dark">
    <div class="flex flex-col items-center gap-16 p-12 text-center text-[rgb(181,205,245)]">
      <h2 class="m-0 text-3xl">
        Counter: {{ numberFormat(count) }}
      </h2>

      <div class="justify-end">
        <div class="flex-center flex-row flex-wrap gap-5">
          <button class="btn" @click="increment">
            Increment
          </button>
          <button class="btn" @click="decrement">
            Decrement
          </button>
          <button class="btn" @click="double">
            Double
          </button>
          <button class="btn" @click="reset">
            Reset
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
