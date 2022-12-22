import { createRouter, RouteRecordRaw, createWebHistory } from "vue-router";
import { ipcRenderer } from "electron";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    component: () => import("../views/login.vue"),
    beforeEnter: (to, from, next) => {
      ipcRenderer.send("changeWindowSize", { width: 265, height: 400 });
      next();
    },
  },
  {
    path: "/list",
    name: "list",
    component: () => import("../views/monitor.vue"),
    beforeEnter: (to, from, next) => {
      ipcRenderer.send("changeWindowSize", { width: 800, height: 600 });
      next();
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
