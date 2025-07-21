import { defineStore } from 'pinia'
import type { Account } from '../types/account'

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: [] as Account[],
  }),
  actions: {
    addAccount(account: Account) {
      this.accounts.push(account)
    },
    removeAccount(id: string) {
      this.accounts = this.accounts.filter(acc => acc.id !== id)
    },
    updateAccount(id: string, updated: Partial<Account>) {
      const index = this.accounts.findIndex(acc => acc.id === id)
      if (index !== -1) {
        this.accounts[index] = { ...this.accounts[index], ...updated }
      }
    },
  },
  persist: true,
})