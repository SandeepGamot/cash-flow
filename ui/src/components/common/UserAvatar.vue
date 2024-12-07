<script setup lang="ts">
import type { UserStore } from '@/core/domain/user.type'
import { computed, onMounted } from 'vue'

const props = defineProps<{ user: UserStore['user'] }>()

onMounted(() => {
  console.log('smg:user:props', props.user)
})

const colors = [
  'bg-red-800',
  'bg-indigo-800',
  'bg-yellow-600',
  'bg-orange-700',
  'bg-cyan-600',
  'bg-sky-800',
  'bg-rose-800',
  'bg-blue-700',
  'bg-lime-600',
  'bg-amber-600'
]
const color = computed(() => colors[(props.user?.firstName.charCodeAt(0) ?? 0) % colors.length])
const initials = computed(() =>
  `${props.user?.firstName[0] ?? '?'}${props.user?.lastName[0] ?? '?'}`.toLocaleUpperCase()
)
</script>

<template>
  <span
    :class="[
      color,
      'p-1 rounded-full select-none text-white text-xs flex items-center justify-center w-7 h-7'
    ]"
    ><span>{{ initials }}</span>
  </span>
</template>
