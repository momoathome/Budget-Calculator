<script lang="ts" setup>
const props = defineProps<{
  dataKey: string // the firebase key
  item: {
    text: string
    amount: number
  }
}>()
const emit = defineEmits(['delete'])

const formatedAmount = numberFormat(props.item.amount)

function onChange() {
  console.log('change')

  // TODO: update expense Object on change
}

const onDelete = () => emit('delete', props.dataKey)
</script>

<template>
  <li class="cashlist-item">
    <form action="" class="flex" @input="onChange">
      <input
        type="text" :value="item.text"
        class="me-1 w-full border-none bg-base py-3 ps-4 text-(xl base_dark) font-600 outline-2 outline-base_dark hover:(cursor-pointer outline-solid) focus-visible:(cursor-text outline-solid)"
      >
      <div class="pointer-events-none bg-base">
        <span class="mt-6px inline-block h-75% w-2px bg-list_divider" />
      </div>
      <input
        type="text" :value="formatedAmount"
        class="ms-1 w-70% border-none bg-base px-4 py-3 text-(xl base_dark) font-600 outline-2 outline-base_dark hover:(cursor-pointer outline-solid) focus-visible:(cursor-text outline-solid)"
      >

      <button type="button" class="absolute right-4 top-3.5 text-2xl text-red-800" i-tabler-trash @click="onDelete" />
    </form>
  </li>
</template>

<style scoped>
</style>
