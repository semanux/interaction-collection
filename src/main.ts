// import { createApp } from 'vue'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// import BootstrapVue from 'bootstrap-vue';

// createApp(App).use(BootstrapVue).mount('#app')
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia' // Import
import BootstrapVue3 from 'bootstrap-vue-3'
import router from "../src/router/index"

// Since every component imports their Bootstrap functionality,
// the following line is not necessary:
// import 'bootstrap'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

const app = createApp(App)
app.use(BootstrapVue3)
app.use(createPinia())
app.use(router)
app.mount('#app')
