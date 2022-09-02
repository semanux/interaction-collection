import { createApp } from "vue";
import App from "./App.vue";
import { createI18n } from "vue-i18n";
import { createPinia } from "pinia";
import BootstrapVue3 from "bootstrap-vue-3";
import router from "./router";
import messages from "@intlify/vite-plugin-vue-i18n/messages";


const i18n = createI18n({
    locale: navigator.language.split("-")[0],
    fallbackLocale: "en",
    messages,
  });

const pinia = createPinia();


const app = createApp(App)
app.use(BootstrapVue3);
app.use(i18n);
app.use(pinia);
app.use(router);


router.isReady().then(() => app.mount("#app"))
