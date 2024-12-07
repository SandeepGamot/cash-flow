import type { UserStore } from '@/core/domain/user.types'
import { getAuthUrl, verifyAuth } from '@/core/services/auth.service'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: (): UserStore => ({
    user: null,
    account: null
  }),
  getters: {
    isLoggedIn: (state) => state.user != null
  },
  actions: {
    async initGoogleAuth() {
      const url = await getAuthUrl()
      location.assign(url)
    },
    async verifyUser() {
      this.user = await verifyAuth()
    },

    logout() {
      this.user = null
    }
  }
})
