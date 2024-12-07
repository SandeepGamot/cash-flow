<template>
  <div class='relative w-full'>
    <div class='flex relative items-center'>
      <input v-model='inputVal' :class='{ "border-red-700": invalid, "border-white": !invalid }'
        class='p-3 w-full rounded-md border' type='text' @focusin='showOverlay = true' @focusout='handleFocusOut' />
      <i v-show='!isEmptyInput' class="pi pi-times absolute right-3" @click='handleClearOption'></i>
    </div>
    <div v-show='showOverlay'
      class='mt-1 w-full max-h-60 overflow-y-auto absolute z-50 border border-zinc-600 rounded bg-zinc-900'>
      <div v-for='(option, index) in filteredOptions' :key='`${option[optionLabel]}-${index}`'>
        <div class='p-4' @mousedown.prevent='handleSelection(option)'>{{
          option[optionLabel] }}</div>
        <div v-if='index < filteredOptions.length - 1' class='h-px bg-zinc-600 mx-2'></div>
      </div>
      <div v-if='isUnknownOption' class='p-4 font-bold' @mousedown.prevent='handleAddNewOption'>
        <span
          class='px-3 py-1 bg-white text-black rounded border border-l-0 border-t-0 border-r-1 border-b-1 border-slate-400 mr-3'>
          Add
        </span>
        {{ inputVal }}
      </div>
    </div>
  </div>
</template>
<script setup lang='ts'>
import { computed, ref } from 'vue';

const props = defineProps<{
  modelValue?: string | null
  options: any[]
  optionLabel: string
  invalid: boolean
}>()

const emit = defineEmits<{
  (e: 'select', value: any): void
  (e: 'add', value: string): void
  (e: 'clear'): void
  (e: 'update:modelValue', value: string | null): void  // Add this emit
}>()

const inputVal = computed({
  get: () => props.modelValue ?? null,
  set: (value) => emit('update:modelValue', value)
})
const showOverlay = ref(false)
const isEmptyInput = computed(() => inputVal.value == null || inputVal.value === '')
const filteredOptions = computed(() => {
  if (isEmptyInput.value) {
    return props.options
  }
  return props.options.filter((option) => (option[props.optionLabel] as string).trim().toLowerCase().includes(inputVal.value!.trim().toLowerCase()))
})
const isUnknownOption = computed(() => filteredOptions.value.length === 0)

const handleSelection = (option: any) => {
  emit("select", option)
  inputVal.value = option[props.optionLabel]
  showOverlay.value = false
}

const handleAddNewOption = () => {
  if (inputVal.value !== '' || inputVal.value != null) {
    emit('add', inputVal.value!)
    showOverlay.value = false
  }
}

const handleClearOption = () => {
  emit('clear')
  showOverlay.value = false
  inputVal.value = null
}

const handleFocusOut = () => {
  if (isUnknownOption.value) {
    handleAddNewOption()
  } else {
    handleSelection(filteredOptions.value[0])
  }
}
</script>