<script setup lang='ts'>
import AmountInputField from '@/components/ui/AmountInputField.vue';
import Dropdown from '@/components/ui/Dropdown.vue';
import type { Category, NewCategory, NewPaymentMode, NewSubCategory, PaymentMode, SubCategory } from '@/core/domain/user-expense.types';
import { createUserExpenseTransaction } from '@/core/services/user-transactions/expense';
import { getCategories } from '@/core/services/user-transactions/expense/category.service';
import { getPaymentModes } from '@/core/services/user-transactions/expense/payment-mode.service';
import { getSubCategories } from '@/core/services/user-transactions/expense/sub-category.service';
import router from '@/router';
import useVuelidate from '@vuelidate/core';
import { helpers, maxLength, maxValue, minValue, required } from '@vuelidate/validators';
import InputText from 'primevue/inputtext';
import { useToast } from 'primevue/usetoast';
import { computed, onMounted, ref } from 'vue';

const $toast = useToast()
const DESCRIPTION_CHAR_LIMIT = 80
const loading = ref<boolean>(false)
const submitting = ref<boolean>(false)
const amount = ref<number | null>(null);
const categories = ref<Category[]>([])
const subCategories = ref<SubCategory[]>([])
const paymentModes = ref<PaymentMode[]>([])

const selectedCategory = ref<Category | NewCategory | null>(null)
const selectedSubCategory = ref<SubCategory | NewSubCategory | null>(null)
const selectedPaymentMode = ref<PaymentMode | NewPaymentMode | null>(null)

const categoryInput = ref<string | null>(null);
const subCategoryInput = ref<string | null>(null);
const paymentModeInput = ref<string | null>(null);

const description = ref<string | null>(null)
const rules = computed(() => ({
  amount: {
    required: required,
    minValue: minValue(1),
    maxValue: maxValue(10_00_00_000)
  },
  selectedCategory: {
    required: required,
    minLength: helpers.withMessage('Category must be atleast 3 characters', (value: any) => value.category.length > 2)
  },
  selectedSubCategory: {
    required: required,
    minLength: helpers.withMessage('Sub Category must be atleast 3 characters', (value: any) => value.subCategory.length > 2)
  },
  selectedPaymentMode: {
    required: required,
    minLength: helpers.withMessage('Payment Mode must be atleast 3 characters', (value: any) => value.paymentMode.length > 2)
  },
  description: {
    maxLength: maxLength(DESCRIPTION_CHAR_LIMIT)
  }
}))

const v$ = useVuelidate(rules, { amount, selectedCategory, selectedSubCategory, selectedPaymentMode, description })

onMounted(async () => {
  loading.value = true
  await Promise.all([fetchCategories(), fetchSubCategories(), fetchPaymentModes()]).catch((e) => {
    console.error(e)
  }).finally(() => {
    loading.value = false
  })
})

const fetchCategories = async () => {
  categories.value = await getCategories()
}

const fetchSubCategories = async () => {
  subCategories.value = await getSubCategories();
}

const fetchPaymentModes = async () => {
  paymentModes.value = await getPaymentModes();
}

const setAmount = (value: number | null) => {
  amount.value = value
}

const setCategory = (category: Category | NewCategory | null) => {
  selectedCategory.value = category
}

const setSubCategory = (subCategory: SubCategory | NewSubCategory | null) => {
  selectedSubCategory.value = subCategory
}

const setPaymentMode = (paymentMode: PaymentMode | NewPaymentMode | null) => {
  selectedPaymentMode.value = paymentMode
}

const setDescription = (value: string) => {
  description.value = value.replace(/\s{2,}/g, " ")
}

const resetForm = () => {
  v$.value.$reset()
  amount.value = null
  selectedCategory.value = null
  selectedSubCategory.value = null
  selectedPaymentMode.value = null
  description.value = null
  categoryInput.value = null
  subCategoryInput.value = null
  paymentModeInput.value = null
}

const handleSubmit = async () => {
  submitting.value = true
  if (!await v$.value.$validate()) {
    submitting.value = false
    return
  }
  try {
    const res = await createUserExpenseTransaction({
      amount: amount.value!,
      category: selectedCategory.value!,
      subCategory: selectedSubCategory.value!,
      paymentMode: selectedPaymentMode.value!,
      description: description.value
    })
    console.info("createUserExpenseTransaction:success", res)
    $toast.add({ severity: 'success', summary: 'Success', detail: 'Expense added', life: 1500 })
    resetForm()
  } catch (error) {
    console.error("createUserExpenseTransaction:error", error)
    $toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to add expense', life: 1500 })
  } finally {
    submitting.value = false
  }

}

</script>
<template>
  <div
    class='py-4 flex items-center justify-between w-screen shadow-lg shadow-red-900 px-4 border-b-2 border-b-red-700'>
    <span class='ml-4'>Add New Expense</span>
    <i class='pi pi-times cursor-pointer mr-2' @click='router.back()' />
  </div>
  <div v-if='loading' class='h-screen'>
    <div class='flex justify-center items-center h-4/5'>
      <ProgressBar mode="indeterminate" style="height: 6px; width: 50%"></ProgressBar>
    </div>
  </div>
  <div class='flex flex-col mx-8 my-2'>
    <Toast class='!w-11/12' position="top-center" />
    <AmountInputField :amount='amount' :disabled='loading || submitting' :focused='true' @update='setAmount'
      @clear='setAmount(null)' :invalid='v$.amount.$error' />
    <small class='text-red-500'>{{ v$.amount.$errors[0]?.$message }} </small>
    <div class='text-sm opacity-70 mt-4 mb-1'>Category:</div>
    <Dropdown v-model='categoryInput' :options='categories' optionLabel='category' @select='setCategory' @add='(value) => setCategory({
      category: value,
      isApproved: false
})' @clear='setCategory(null)' :invalid='v$.selectedCategory.$error' />
    <small class='text-red-500'>{{ v$.selectedCategory.$errors[0]?.$message }} </small>
    <div class='text-sm opacity-70 mt-4 mb-1'>Sub-Category:</div>
    <Dropdown v-model='subCategoryInput' :options='subCategories' optionLabel='subCategory' @select='setSubCategory'
      @add='(value) => setSubCategory({
        subCategory: value,
        isApproved: false
      })' @clear='setSubCategory(null)' :invalid='v$.selectedSubCategory.$error' />
    <small class='text-red-500'>{{ v$.selectedSubCategory.$errors[0]?.$message }} </small>
    <div class='text-sm opacity-70 mt-4 mb-1'>Payment Mode:</div>
    <Dropdown v-model='paymentModeInput' :options='paymentModes' optionLabel='paymentMode' @select='setPaymentMode'
      @add='(value) => setPaymentMode({
      paymentMode: value,
      isApproved: false
    })' @clear='setPaymentMode(null)' :invalid='v$.selectedPaymentMode.$error' />
    <small class='text-red-500'>{{ v$.selectedPaymentMode.$errors[0]?.$message }} </small>
    <div class='text-sm opacity-70 mt-4 mb-1'>Description:</div>
    <InputText class='h-11 text-xs' v-model='description' @update:modelValue='setDescription'
      :invalid='v$.description.$error' />
    <small class='text-red-500'>{{ v$.description.$errors[0]?.$message }} </small>
    <div class='text-right mr-2 mt-1'>{{ description?.length ?? 0 }}/{{ DESCRIPTION_CHAR_LIMIT }}</div>
    <Button class='mt-2' :disabled='submitting' @click='handleSubmit'>
      <div class='flex items-center justify-center' v-if='submitting'>
        <span class='flex-1'>Submitting</span>
        <ProgressSpinner style="height: 30px; width: 30px; color:'black'" />
      </div>
      <span class='p-1' v-else>Add Expense</span>
    </Button>
    <Button class='mt-3' severity='secondary' :disabled='submitting' @click='router.back()'>
      <span>Cancel</span>
    </Button>
  </div>

</template>

<style>
datalist option {
  width: 100%;
}
</style>


<!-- ExpenseTransactions {
  ExpenseTransactionID UUID [pk, unique]
  Amount DECIMAL(10, 2) [not null]
  CategoryID UUID [not null, ref: > ExpenseCategories.CategoryID]
  SubCategoryID UUID [not null, ref: > ExpenseSubCategories.SubCategoryID]
  PaymentModeID UUID [not null, ref: > PaymentModes.PaymentModeID]
  Description TEXT
  CreatedDateTime DATETIME [not null]
  CreatedBy UUID [not null, ref: > Users.UserID]
  LastEditedDateTime DATETIME
  LastEditedBy UUID [ref: > Users.UserID]
} -->