<script setup lang="ts">
import { useUserStore } from '@/stores/user.store'
import AppLogo from '@/components/icons/AppLogo.vue'
import { onMounted } from 'vue'
import router, { AppRoutes } from '@/router'

const userStore = useUserStore()

onMounted(() => {
  console.log('smg:userStore', userStore)
  if (userStore.isLoggedIn) {
    router.push({ name: AppRoutes.base, replace: true })
  }
})
</script>

<template>
  <div class="w-full h-full flex flex-col justify-center items-center space-y-10">
    <div class="w-32 h-20">
      <AppLogo />
    </div>
    <span class="font-bold text-2xl">Cashflow</span>
    <Button @click="userStore.initGoogleAuth()">
      Login with Google
    </Button>
  </div>
</template>
