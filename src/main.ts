import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "./router";
import { persistedState } from "./store/plugins/persistedState";
import "./style.css";
import App from "./App.vue";

const pinia = createPinia();
pinia.use(persistedState);

createApp(App).use(pinia).use(router).mount("#app");
