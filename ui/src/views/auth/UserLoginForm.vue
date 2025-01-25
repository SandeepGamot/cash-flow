<script setup lang='ts'>
import InputText from 'primevue/inputtext';
import Password from 'primevue/password'
import { useToast } from 'primevue/usetoast';
import { computed, onMounted, ref } from 'vue'
import AppLogo from '@/components/icons/AppLogo.vue';
import router, { AppRoutes } from '@/router';
import { loginUser } from '@/core/services/user.service';

const $toast = useToast()
const username = ref<string>()
const password = ref<string>()
const submitting = ref<boolean>(false);

const isUsernameEmpty = computed(() => username.value == null || username.value.length === 0)
const isPasswordEmpty = computed(() => password.value == null || password.value.length === 0)
const disabled = computed(() => isUsernameEmpty.value || isPasswordEmpty.value || submitting.value)

const sendToRegisterationPage = () => {
  router.push({ name: AppRoutes.users.register, replace: true })
}

const onLogin = async () => {
  try {
    if (username.value == null || password.value == null) {
      $toast.add({ severity: 'error', summary: 'Please enter values for the missing fields' })
      return
    }
    submitting.value = true
    await loginUser({
      username: username.value,
      password: password.value
    })
    $toast.add({ severity: 'success', summary: 'Login successful.' })
    router.push({ name: AppRoutes.base })
  } catch (error: any) {
    $toast.add({ severity: 'error', summary: 'Login failed. Invalid username or password' })
    console.error({ error })
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class='w-full h-screen'>
    <div class='w-full h-full flex flex-col gap-y-5 items-center justify-center'>
      <Toast class='!w-11/12' position="top-center" />
      <span class="font-bold text-2xl">Cashflow</span>
      <div class="w-32 h-20">
        <AppLogo />
      </div>
      <InputText v-model='username' style='width: 230px;' name="username" type="text" placeholder="Username" />
      <Password v-model='password' :feedback='false' placeholder='Password' toggleMask />
      <Button style='width: 230px;' class='mt-8' :disabled='disabled' @click='onLogin()'>
        <div class='flex items-center justify-center' v-if='submitting'>
          <span class='flex-1'>Loading...</span>
          <ProgressSpinner style="height: 30px; width: 30px; color:'black'" />
        </div>
        <span class='p-1' v-else>Login</span>
      </Button>
      <span class='cursor-pointer underline mt-8 text-xs' @click='sendToRegisterationPage()'>Don't have an account?
        Register</span>

    </div>
  </div>
</template>