import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/mainbox",
    name: "mainbox",
    component: () => import("../views/MainBox.vue"),
    // mainbox的嵌套路由，后面根据权限动态添加
    children:[
      {
        path:"/a"
      }
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
