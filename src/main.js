import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCryptojs from 'vue-cryptojs'

import 'vue-connect-wallet/dist/style.css'
import '../src/assets/css/style.css'

createApp(App).use(store).use(router).use(VueCryptojs).mount('#app')
