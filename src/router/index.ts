import { createRouter, RouteRecordRaw, createWebHistory } from "vue-router";
import { ipcRenderer } from "electron";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "login",
		component: () => import("../views/login.vue"),
		beforeEnter: (to, from, next) => {
			ipcRenderer.send("changeWindowSize", { width: 260, height: 490 });
			next();
		},
	},
	{
		path: "/test",
		name: "test",
		component: () => import("../views/test.vue"),
		beforeEnter: (to, from, next) => {
			ipcRenderer.send("changeWindowSize", { width: 730, height: 490 });
			next();
		},
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes: routes,
});

export default router;
