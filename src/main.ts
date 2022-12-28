import { createApp } from "vue";
import Router from "./router/index";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import "./style.css";
import App from "./App.vue";

const app = createApp(App);
app.use(Router);
app.use(ElementPlus);
app.mount("#app");
