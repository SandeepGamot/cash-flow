<script setup lang='ts'>
import { onMounted, ref } from 'vue';

const inputId = ref<string>(Date.now().toString(16))
const props = withDefaults(defineProps<{
  amount: number | null
  focused: boolean
  disabled: boolean
  invalid?: boolean
}>(), {
  focused: false,
  disabled: false,
  invalid: false
});
const emit = defineEmits<{
  (e: 'update', value: number): void
  (e: 'clear'): void
}>()
onMounted(() => {
  props.focused && document.getElementById(inputId.value)?.focus()
});
</script>

<template>
  <div>
    <div class='text-sm opacity-70 mb-1'>Amount:</div>
    <InputGroup class='relative'>
      <InputGroupAddon>₹</InputGroupAddon>
      <InputNumber :disabled='disabled' :inputId='inputId' inputClass='text-right h-10' :modelValue='props.amount'
        mode='decimal' placeholder='Amount' fluid variant="filled" locale="en-IN" :min='1' :max='10_00_00_000'
        :maxFractionDigits='2' @update:modelValue='emit("update", $event)' :invalid='props.invalid' />
      <Button v-if='!disabled' class='h-10' icon='pi pi-times' outlined @click='emit("clear")' />
    </InputGroup>
  </div>
</template>