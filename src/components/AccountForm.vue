<template>
  <!-- Основной контейнер формы -->
  <v-container>
    <v-row class="mb-4">
      <v-col cols="12">
        <h2>Учетные записи</h2>
        <!-- Кнопка добавления новой учетной записи -->
        <v-btn icon small @click="addAccount" class="ml-2">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-alert type="info" dense>
      Для указания нескольких меток используйте разделитель ";"
    </v-alert>

    <!-- Таблица с учетными записями -->
    <v-table fixed-header>
      <thead>
        <tr>
          <th class="text-left">Метки</th>
          <th class="text-left">Тип записи</th>
          <th class="text-left">Логин</th>
          <th class="text-left">Пароль</th>
          <th class="text-left">Действия</th>
        </tr>
      </thead>
      <tbody>
        <!-- Перебор всех аккаунтов -->
        <tr v-for="(account) in accounts" :key="account.id">
          <td>
            <!-- Поле для ввода меток -->
            <v-text-field
              v-model="account.tagsText"
              label="Метки"
              @update:focused="(focused) => { if (!focused) updateTags(account) }"
              :error-messages="errorsById[account.id]?.tags"
            />
          </td>
          <td>
            <!-- Выпадающий список типа записи -->
            <v-select
              v-model="account.type"
              :items="['LDAP', 'Local']"
              label="Тип записи"
              @change="() => validateAccount(account)"
              :error-messages="errorsById[account.id]?.type"
            />
          </td>
          <td>
            <!-- Поле для логина -->
            <v-text-field
              v-model="account.login"
              label="Логин"
              @update:focused="(focused) => { if (!focused) validateAccount(account) }"
              :error-messages="errorsById[account.id]?.login"
            />
          </td>
          <td>
            <!-- Поле для пароля (только для Local) -->
            <v-text-field
              v-if="account.type === 'Local'"
              v-model="account.password"
              label="Пароль"
              type="password"
              @update:focused="(focused) => { if (!focused) validateAccount(account) }"
              :error-messages="errorsById[account.id]?.password"
            />
          </td>
          <td>
            <!-- Кнопка удаления аккаунта -->
            <v-btn icon small @click="removeAccount(account.id)">
              <v-icon color="red">mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useAccountsStore } from '../store/accounts'
import type { AccountWithFields } from '../types/account'

// Получаем store Pinia
const store = useAccountsStore()

// Локальный массив аккаунтов для работы с формой
const accounts = ref<AccountWithFields[]>([])

// Объект для хранения ошибок по id аккаунта
const errorsById = ref<Record<string, AccountWithFields['errors']>>({})

// Синхронизация локального массива с хранилищем
watchEffect(() => {
  accounts.value = store.accounts.map(acc => ({
    ...acc,
    tagsText: acc.tags.map(t => t.text).join(';'),
  }))
})

// Генерация уникального id для новой учетной записи
const generateId = () => Math.random().toString(36).substring(2, 9)

const addAccount = () => {
  const newAccount: AccountWithFields = {
    id: generateId(),
    tags: [],
    type: 'Local',
    login: '',
    password: '',
    tagsText: '',
  }
  store.addAccount(newAccount)
  accounts.value.push(newAccount)
  errorsById.value[newAccount.id] = {}
}

const removeAccount = (id: string) => {
  store.removeAccount(id)
  accounts.value = accounts.value.filter(acc => acc.id !== id)
  delete errorsById.value[id]
}

const updateTags = (account: AccountWithFields) => {
  const rawTags = account.tagsText || ''
  account.tags = rawTags
    .split(';')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)
    .map(tag => ({ text: tag }))

  validateAccount(account)
}

const validateAccount = (account: AccountWithFields) => {
  const errors: AccountWithFields['errors'] = {}

  // Логин: обязательно, максимум 100 символов
  if (!account.login.trim()) {
    errors.login = 'Обязательное поле'
  } else if (account.login.length > 100) {
    errors.login = 'Максимум 100 символов'
  }

  // Пароль: обязательно для Local, максимум 100 символов
  if (account.type === 'Local') {
    if (!account.password || !account.password.trim()) {
      errors.password = 'Обязательное поле'
    } else if (account.password.length > 100) {
      errors.password = 'Максимум 100 символов'
    }
  }

  // Метки: не обязательно, максимум 50 символов на каждую
  if (account.tagsText) {
    const tags = account.tagsText.split(';').map(tag => tag.trim()).filter(tag => tag.length > 0)
    for (const tag of tags) {
      if (tag.length > 50) {
        errors.tags = 'Каждая метка максимум 50 символов'
        break
      }
    }
  }

  // Сохраняем ошибки для текущего аккаунта
  errorsById.value[account.id] = errors

  // Обновляем данные в store
  store.updateAccount(account.id, {
    tags: account.tags,
    type: account.type,
    login: account.login,
    password: account.type === 'LDAP' ? null : account.password
  })
}
</script>