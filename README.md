# SaaSoft — тестовое задание

Веб-приложение на Vue 3 + TypeScript + Vuetify для управления списком учетных записей с валидацией, хранением в localStorage и современным UI.

---

## 🚀 Быстрый старт

1. **Установите зависимости:**
   ```bash
   npm install
   ```

2. **Запустите проект в режиме разработки:**
   ```bash
   npm run dev
   ```

3. **Соберите проект для продакшена:**
   ```bash
   npm run build
   ```

4. **Предпросмотр продакшн-сборки:**
   ```bash
   npm run preview
   ```

---

## 📝 Описание функционала

- **Добавление, редактирование и удаление учетных записей**
- **Валидация полей:**
  - Метка: не обязательна, максимум 50 символов на каждую (разделитель — `;`)
  - Тип записи: выбор из "LDAP" или "Локальная"
    - "LDAP": поле "Пароль" скрыто, сохраняется как `null`
    - "Локальная": поле "Пароль" обязательно, максимум 100 символов
  - Логин: обязательно, максимум 100 символов
- **Ошибки отображаются прямо в форме**
- **Данные сохраняются в localStorage (persisted Pinia store)**
- **Современный UI на Vuetify 3 с Material Design Icons**

---

## 🗂️ Структура проекта

- `src/components/AccountForm.vue` — основная форма управления аккаунтами
- `src/store/accounts.ts` — Pinia store для хранения и управления аккаунтами
- `src/types/account.ts` — интерфейсы для типизации аккаунтов
- `src/plugins/vuetify.ts` — подключение и настройка Vuetify и иконок
- `src/main.ts` — точка входа, подключение Pinia, Vuetify и App

---

## 🛠️ Технологии

- [Vue 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vuetify 3](https://next.vuetifyjs.com/)
- [Pinia](https://pinia.vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Material Design Icons](https://pictogrammers.com/library/mdi/)

---

## 📄 Пример интерфейса Account

```ts
export interface Account {
  id: string
  tags: { text: string }[]
  type: 'LDAP' | 'Local'
  login: string
  password?: string | null
}
```
