import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("../components/Layout.vue"),
    meta: {
      icon: "edit",
      title: "第一級",
    },
    children: [
      {
        path: "/level",
        name: "Level",
        component: () => import("../components/MainContent.vue"),
        redirect: "/level/menu1/menu1-1",
        meta: {
          icon: "delete",
          title: "第一級－１",
        },
        children: [
          {
            path: "menu1",
            name: "Menu1Demo",
            meta: {
              title: "第一級－１－１",
            },
            component: () => import("../components/MainContent.vue"),
          },
        ],
      },
      {
        path: "/level2",
        name: "Level2",
        component: () => import("../components/MainContent.vue"),
        meta: {
          icon: "carbon:user-role",
          title: "第一級－２－１",
        },
        children: [
          {
            path: "menu12",
            name: "Menu1Demo",
            meta: {
              title: "Menu12",
            },
            component: () => import("../components/MainContent.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/level",
    name: "Level",
    component: () => import("../components/MainContent.vue"),
    meta: {
      icon: "add",
      title: "第二級",
    },
  },
];

const otherRouter = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
    },
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes: [...routes, ...otherRouter],
});
