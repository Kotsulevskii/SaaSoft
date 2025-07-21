// Плагин для инициализации и настройки Vuetify в проекте
import { createVuetify } from 'vuetify'
import 'vuetify/_styles.scss'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components, // Регистрируем все компоненты
  directives, // Регистрируем все директивы
  icons: {
    defaultSet: 'mdi', // Используем mdi как набор иконок по умолчанию
    aliases,
    sets: {
      mdi,
    },
  },
})