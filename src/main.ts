import { createApp } from "vue";
import router from "./router"; //引入路由
import ElementPlus from "element-plus"; //引入element-plus
import "element-plus/dist/index.css"; //引入element-plus样式
import App from "./App.vue";

createApp(App).use(ElementPlus).use(router).mount("#app");
