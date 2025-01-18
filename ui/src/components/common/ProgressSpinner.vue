<script setup lang="ts">
import AppLogo from '@/components/icons/AppLogo.vue'

const { show, text = 'Loading...' } = defineProps<{ show: boolean; text?: string }>()
</script>

<template>
  <div v-if="show" class="w-full h-full flex flex-col justify-center items-center animate-pulse">
    <div class="w-1/5 h-1/6">
      <AppLogo />
    </div>
    <div class="text-white">{{ text }}</div>
  </div>
</template>
