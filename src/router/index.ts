import type { RouteRecordRaw } from "vue-router"; // 引入vue-router中的类型

import { createRouter, createMemoryHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/Main"),
  },
  {
    path: "/game",
    name: "game",
    component: () => import("@/views/Game"),
  },
  {
    path: "/game-over",
    name: "game-over",
    component: () => import("@/views/GameOver"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "mian",
    component: () => import("@/views/Main"),
  },
];

const router = createRouter({
  routes,
  history: createMemoryHistory(),
});

export default router;
