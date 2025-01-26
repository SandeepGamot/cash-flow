<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useUserStore } from '@/stores/user.store'
import { formatToIndianCurrency } from '@/core/utils/format';
import { getMonthExpenseAggregate, getTodayExpenseAggregate, getWeekExpenseAggregate } from '@/core/services/user-transactions/expense'
import { Card, Skeleton } from 'primevue';

const userStore = useUserStore()
const loading = ref(false)
const todaysExpenseAggregate = ref(0)
const weeksExpenseAggregate = ref(0)
const monthsExpenseAggregate = ref(0)

const fetchTodayExpenseAggregate = async () => {
  todaysExpenseAggregate.value = await getTodayExpenseAggregate(userStore.user!.id)
}
const fetchWeekExpenseAggregate = async () => {
  weeksExpenseAggregate.value = await getWeekExpenseAggregate(userStore.user!.id)
}
const fetchMonthExpenseAggregate = async () => {
  monthsExpenseAggregate.value = await getMonthExpenseAggregate(userStore.user!.id)
}

onMounted(() => {
  loading.value = true;
  Promise.all([fetchTodayExpenseAggregate(), fetchWeekExpenseAggregate(), fetchMonthExpenseAggregate()]).catch(() => { console.error('StatusGrid.vue: failed when fetching aggregates') }).finally(() => { loading.value = false })
})
</script>

<template>
  <div class="grid grid-cols-3 gap-x-2 mt-8">
    <Card>
      <template #content>
        <div class='max-w-xs'>
          <div class="text-center text-sm">Today</div>
          <div class="text-center font-bold text-xs tabular-nums overflow-x-auto whitespace-nowrap">
            <span v-if="loading">
              <Skeleton width="100%" height="1rem" />
            </span>
            <span v-else>
              {{ formatToIndianCurrency(todaysExpenseAggregate) }}
            </span>
          </div>
        </div>
      </template>
    </Card>
    <Card>
      <template #content>
        <div class="text-center text-sm">Week</div>
        <div class="text-center font-bold text-xs tabular-nums overflow-x-auto whitespace-nowrap">
          <span v-if="loading">
            <Skeleton width="100%" height="1rem" />
          </span>
          <span v-else>
            {{ formatToIndianCurrency(weeksExpenseAggregate) }}
          </span>
        </div>
      </template>
    </Card>
    <Card>
      <template #content>
        <div class='max-w-xs'>
          <div class="text-center text-sm">Month</div>
          <div class="text-center font-bold text-xs tabular-nums overflow-x-auto whitespace-nowrap">
            <span v-if="loading">
              <Skeleton width="100%" height="1rem" />
            </span>
            <span v-else>
              {{ formatToIndianCurrency(monthsExpenseAggregate) }}
            </span>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
