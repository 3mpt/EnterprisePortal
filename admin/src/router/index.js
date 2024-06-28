import { createRouter, createWebHashHistory } from "vue-router";
import RoutesConfig from "./config";
import store from "@/store";
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
    children: [
      {
        path: "/a"
      }
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log(to);
  // console.log(from);
  // console.log(next);
  if (to.name === "login") {
    next();
  } else {
    // 如果授权了 next()
    // 未授权 重定向到login
    if (!localStorage.getItem("token")) {
      next({ path: "/login" })
    } else {
      if (!store.state.isGetterRouter) {
        ConfigRouter()
        next({
          path: to.fullPath
        })
      } else {
        next()
      }

    }
  }
});
const ConfigRouter = () => {
  RoutesConfig.forEach(item => {
    router.addRoute("mainbox", item);
  })
  // 改变isGetterRouter的值
  store.commit("changeGetterRouter", true);
}
export default router;
