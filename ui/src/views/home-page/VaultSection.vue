<script setup>
import VaultIcon from '@/components/icons/VaultIcon.vue';
</script>

<template>
  <div class="border border-dashed rounded-md flex flex-col items-center pt-2">
    <VaultIcon :class='"w-12 h-12 fill-white pb-0"' />
    <div class="font-bold text-md">Vault</div>
    <div class="flex flex-wrap gap-x-8 gap-y-3 justify-center py-4 w-auto">
      <Button severity="success" raised>Add Money</Button>
      <Button severity="danger" raised>Take Money</Button>
    </div>
  </div>
</template>
