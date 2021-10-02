import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "./plugins/axios";
import router from "./router";
import Vuelidate from "vuelidate";
import store from "./store";
import MainLayout from "@/components/layouts/MainLayout";
import EmptyLayout from "@/components/layouts/EmptyLayout";

Vue.use(Vuelidate);

import VueSocketIO from "vue-socket.io";

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "http://localhost:3002",
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_",
    },
    options: { allowEIO3: true }, //Optional options
  })
);

// export const SocketInstance = socketio("http://localhost:3002");
// Vue.use(VueSocketIO, SocketInstance);

Vue.component("MainLayout", MainLayout);
Vue.component("EmptyLayout", EmptyLayout);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
