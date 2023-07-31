<script lang="ts" setup>
const props = defineProps<{
  index: string
  data: {
    id: number
    text: string
    amount: number
  }[]
}>()

const emit = defineEmits(['submit'])

const description = props.index === 'Income' ? 'Income' : 'Expense'

const inputValue = ref<string>()
const inputAmount = ref<number | string | null>(null)

function submitNewCashItem() {
  if (inputValue.value === '' || inputValue.value === null || inputValue.value === undefined || inputAmount.value === undefined || inputAmount.value === null)
    return

  emit('submit', inputValue.value, +inputAmount.value, props.index)
  inputValue.value = ''
  inputAmount.value = null
}
</script>

<template>
  <div>
    <h4 class="m-0 text-(xl primary) font-600">
      {{ index }}
    </h4>
    <ul class="my-2 flex flex-col gap-4 ps-0">
      <cash-item v-for="(item) in props.data" :key="item.id" :item="item" />
      <new-cash-item :key="index" v-model:inputValue="inputValue" v-model:inputAmount="inputAmount"
        :description="description" @submit="submitNewCashItem" />
      {{ inputValue }}
      {{ inputAmount }}
    </ul>
  </div>
</template>

<style scoped>
</style>
