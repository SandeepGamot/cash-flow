<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useUserStore } from '@/stores/user.store'
import router, { AppRoutes } from '@/router'
import ProgressSpinner from '@/components/common/ProgressSpinner.vue'
import TopBar from './TopBar.vue'
// import StatsGrid from './StatsGrid.vue'
// import VaultSection from './VaultSection.vue'
import TransactionButtons from './TransactionButtons.vue'

const userStore = useUserStore()
const loading = ref(false)

const sendToLoginPage = () => {
  router.push({ name: AppRoutes.users.login, replace: true })
}

onMounted(() => {
  loading.value = true
  userStore
    .verifyUser()
    .catch(() => {
      userStore.logout()
      sendToLoginPage()
    })
    .finally(() => {
      loading.value = false
    })
})

watch(() => userStore.user, (updatedUserVal) => {
  if (updatedUserVal == null) {
    sendToLoginPage()
  }
})


</script>

<template>
  <div class="w-full h-full px-4 py-2">
    <ProgressSpinner :show="loading" />
    <div v-if="!loading">
      <TopBar :user="userStore.user" @logout='userStore.logout()' />
      <!-- <StatsGrid /> -->
      <!-- <VaultSection /> -->
      <TransactionButtons />
    </div>
  </div>
</template>
