import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/queue-handler",
    name: "handler",
    component: () => import("../views/Handler.vue"),
  },
  {
    path: "/queue-generator",
    name: "client",
    component: () => import("../views/Client.vue"),
  },
  {
    path: "/queue-list",
    name: "list",
    component: () => import("../views/List.vue"),
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
