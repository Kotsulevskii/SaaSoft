// src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

import App from './App.vue'
import vuetify from './plugins/vuetify'

const pinia = createPinia()


pinia.use(
  createPersistedState({
    storage: localStorage, 
  })
)

const app = createApp(App)
app.use(pinia)
app.use(vuetify)
app.mount('#app')