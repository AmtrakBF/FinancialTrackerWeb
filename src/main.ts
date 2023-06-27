import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { clickOutside } from './directives/onClickOut'
import VueCookies from 'vue-cookies'

const app = createApp(App)

app.use(router).use(VueCookies, { expires: '30min', sameSite: 'Strict', secure: true }).directive("click-outside", clickOutside)

app.mount('#app')
