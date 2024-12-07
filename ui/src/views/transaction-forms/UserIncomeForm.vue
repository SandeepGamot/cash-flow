<script setup lang='ts'>
import router from '@/router';
</script>
<template>
  <div class='py-1 w-screen shadow-2xl shadow-green-900 px-4 border-b-2 border-b-green-700'>
    <i class='pi pi-times cursor-pointer' @click='router.back()' />
    <span class='ml-12'>Add New Income</span>
  </div>
</template>