<script setup lang='ts'>
import router from '@/router';
import { transatctionRouteNames } from '@/router/transaction.router';

const showUserExpenseForm = () => router.push({ name: transatctionRouteNames.expense.new })
const showUserIncomeForm = () => router.push({ name: transatctionRouteNames.income.new })
</script>

<template>
  <div class="p-4 mt-8 flex flex-col gap-y-8 justify-center">
    <Button disabled outlined raised @click="showUserIncomeForm()">
      Add Income
    </Button>
    <Button severity="danger" outlined raised @click="showUserExpenseForm()">
      Add Expense
    </Button>
  </div>
</template>
