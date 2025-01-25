<script setup lang='ts'>
import InputText from 'primevue/inputtext';
import Password from 'primevue/password'
import { useToast } from 'primevue/usetoast';
import { computed, ref } from 'vue'
import AppLogo from '@/components/icons/AppLogo.vue';
import router, { AppRoutes } from '@/router';
import { registerUser } from '@/core/services/user.service';

const $toast = useToast()
const username = ref<string>()
const password = ref<string>()
const submitting = ref<boolean>(false);

const isUsernameEmpty = computed(() => username.value == null || username.value.length === 0)
const isPasswordEmpty = computed(() => password.value == null || password.value.length === 0)
const disabled = computed(() => isUsernameEmpty.value || isPasswordEmpty.value || submitting.value)
const sendToLoginPage = () => {
  router.push({ name: AppRoutes.users.login, replace: true })
}

const onRegister = async () => {
  try {
    if (username.value == null || password.value == null) {
      $toast.add({ severity: 'error', summary: 'Please add all the fields' })
      return
    }
    submitting.value = true
    const user = await registerUser({
      username: username.value,
      password: password.value
    })
    $toast.add({ severity: 'success', summary: 'Registeration successful.' })
    sendToLoginPage()
  } catch (error: any) {
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
      <Button style='width: 230px;' class='mt-8' label="Register" :disabled='disabled' @click='onRegister()'>
        <div class='flex items-center justify-center' v-if='submitting'>
          <span class='flex-1'>Submitting</span>
          <ProgressSpinner style="height: 30px; width: 30px; color:'black'" />
        </div>
        <span class='p-1' v-else>Register</span>
      </Button>
      <span class='cursor-pointer underline mt-8 text-xs' @click='sendToLoginPage()'>Have an account?
        Login</span>
    </div>
  </div>
</template>