<script setup lang="ts">
import type { UserStore } from '@/core/domain/user.types'
import router, { AppRoutes } from '@/router'
import AppLogo from '@/components/icons/AppLogo.vue'
import UserAvatar from '@/components/common/UserAvatar.vue'

const props = defineProps<{ user: UserStore['user'] }>()
defineEmits(['logout'])
const sendToAccountsPage = () => {
  router.push({ name: AppRoutes.accounts.base, params: { id: props.user!.id } })
}
</script>
<template>
  <div class="flex items-center justify-between text-white">
    <div class="flex items-center gap-x-2 w-40">
      <div class="w-1/3 h-auto">
        <AppLogo />
      </div>
      <span>Cashflow</span>
    </div>
    <!-- <Button :class='"rounded-sm"' @click='$emit("logout")'> Logout </Button> -->
    <!-- <button  class='bg-red-500 p-2' type="button">Logout</button> -->
    <!-- <div
      class="flex items-center justify-around w-40 bg-cf-black-soft border border-zinc-50 rounded-md py-0.5 cursor-pointer"
      @click="sendToAccountsPage">
      <span class="text-sm">₹ 11,000</span>
      <UserAvatar :user="props.user" />
    </div> -->
  </div>
</template>
