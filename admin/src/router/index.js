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
  if (to.name === "login") {
    next();
  } else {
    // 如果授权了 next()
    // 未授权 重定向到login
    if (!localStorage.getItem("token")) {
      next({ path: "/login" })
    } else {
      if (!store.state.isGetterRouter) {
        // 先删了
        router.removeRoute("mainbox")
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
  if(!router.hasRoute("mainbox")){
    router.addRoute("mainbox", {
      path: "/mainbox",
      name: "mainbox",
      component: () => import("../views/MainBox.vue")
    })
  }
  RoutesConfig.forEach(item => {
    checkPermission(item) && router.addRoute("mainbox", item);
  })
  // 改变isGetterRouter的值
  store.commit("changeGetterRouter", true);
}
const checkPermission = (item) => {
  if (item.requireAdmin) {
    // 如果是管理员
    return store.state.userInfo.role === 1
  }
  return true;
}
export default router;
