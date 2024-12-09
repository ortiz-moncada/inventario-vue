import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import { router } from './router/routes'
import {createPinia} from 'pinia'
import  piniaPluginPersistedstate  from 'pinia-plugin-persistedstate'

import 'quasar/src/css/index.sass';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css';
import '@quasar/extras/material-icons-round/material-icons-round.css';
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css';
import '@quasar/extras/material-symbols-outlined/material-symbols-outlined.css';
import '@quasar/extras/material-symbols-rounded/material-symbols-rounded.css';
import '@quasar/extras/material-symbols-sharp/material-symbols-sharp.css';
import '@quasar/extras/mdi-v6/mdi-v6.css';


const pinia = createPinia()


const app = createApp(App)
app.use(Quasar, {
    plugins: {
    }, 
  })


app.use(router)
app.mount('#app')
app.use(pinia)
pinia.use(piniaPluginPersistedstate)
