import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import panZoom from "vue-panzoom";

loadFonts();

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .use(panZoom, { componentName: "yourPanZoom" })
  .mount("#app");
