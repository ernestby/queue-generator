import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/registration",
    name: "registration",
    component: () => import("../views/Registration.vue"),
  },
  {
    path: "/queue-handler",
    name: "handler",
    component: () => import("../views/Handler.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/queue-generator",
    name: "client",
    component: () => import("../views/Client.vue"),
  },
  {
    path: "/",
    name: "list",
    component: () => import("../views/List.vue"),
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth) {
    if (store.state.auth.token) {
      return next();
    }

    return next({
      name: "login",
      query: {
        redirect: to.fullPath,
      },
    });
  }
  if (store.state.auth.token) {
    await store.dispatch("auth/getCurrentUser");
  }
  next();
});

export default router;
