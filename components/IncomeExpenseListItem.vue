<script lang="ts" setup>
const props = defineProps<{
  dataKey: string // the firebase key
  category: string
  item: {
    text: string
    amount: number
  }
}>()
const emit = defineEmits(['delete', 'update'])
const inputValue = ref(props.item.text)
const inputAmount = ref<string | number>(numberFormat(props.item.amount))
// template ref for inputAmount
const input = ref()
const { focused } = useFocus(input)

watch(focused, (focused) => {
  if (focused)
    inputAmount.value = parseLocaleNumber(inputAmount.value)
    // console.log('input element has been focused')
  else inputAmount.value = numberFormat(props.item.amount)
})

function onChange() {
  if (inputValue.value === '' || inputValue.value === undefined || inputAmount.value === undefined || inputAmount.value === null || Number.isNaN(parseLocaleNumber(inputAmount.value)))
    return

  emit('update', inputValue.value, parseLocaleNumber(inputAmount.value), props.dataKey)
}
const onDelete = () => emit('delete', props.dataKey)
</script>

<template>
  <li class="cashlist-item">
    <form action="" class="relative flex" @input="onChange">
      <AppInput v-model:inputValue="inputValue" class="me-1 w-full" />
      <div class="pointer-events-none">
        <span class="mt-6px inline-block h-75% w-2px bg-list_divider" />
      </div>
      <AppInput ref="input" v-model:inputValue="inputAmount" class="ms-1 w-70%" />

      <button type="button" class="absolute right-4 top-4 text-2xl text-red-800 hover:text-red-600" i-tabler-trash @click="onDelete" />
    </form>
  </li>
</template>

<style scoped>
</style>
