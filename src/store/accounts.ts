// Pinia store для управления учетными записями пользователей
import { defineStore } from 'pinia'
import type { Account } from '../types/account'

// Экспортируемое хранилище аккаунтов
export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: [] as Account[],
  }),
  // Методы для работы с аккаунтами
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
  // Автоматическое сохранение состояния в localStorage
  persist: true,
})