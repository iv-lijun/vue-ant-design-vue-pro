/* eslint-disable prettier/prettier */
import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from "../views/404";
import NProgress from "nprogress";
// 样式文件
import "nprogress/nprogress.css";

Vue.use(VueRouter);

const routes = [
  {
    // 先指向 user
    path: "/user",
    // router-view 占位符
    // 这个组件我们可以专门去创建一个组件，用来挂载我们的 router-view 的
    // 然后引入并使用这个创建的占位符组件，这个占位符组件在 <template> 中就一行代码 `<router-view> </router-view>`
    // component: RenderRouterView,

    // 用 render 函数来替代占位符组件，其实就是替代了 ``<router-view> </router-view>` ，渲染函数直接渲染一个“router-view”标签
    // component: { render: h => h("router-view") },
    // 同样使用异步加载的方式来加载我们的用户布局组件
    // 同样设置 webpack 的打包，都打到 layout 文件夹下
    component: () =>
      import(/*webpackChunkName: "layout" */ "../layouts/UserLayout.vue"),

    // user下面是我们的一个嵌套路由
    // children 下面有我们的登录页和注册页
    children: [
      {
        // 匹配到 user 时，我们重定向到login页
        path: "/user",
        redirect: "/user/login"
      },
      // 登录页
      {
        path: "/user/login",
        // 取个名称
        name: "login",
        // 还要对应一个组件
        // 对应的组件的话都使用异步加载，都使用这种方式：
        // webpackChunkName 可以根据我们的需要改成 “user”，这样在webpack在打包的时候就会将标识为“user”的都打在一个包里面
        component: () =>
          import(/*webpackChunkName: "user" */ "../views/User/Login.vue")
      },
      // 注册页
      {
        path: "/user/register",
        // 取个名称
        name: "register",
        // 还要对应一个组件
        // 对应的组件的话都使用异步加载，都使用这种方式：
        // webpackChunkName 可以根据我们的需要改成 “user”，这样在webpack在打包的时候就会将标识为“user”的都打在一个包里面
        component: () =>
          import(/*webpackChunkName: "user" */ "../views/User/Register.vue")
      }
    ]
  },
  {
    // 由于 dashboard 和 form 的layout 是一致的，所以我们就把它配置到我们的根路径下面
    // 根路径下提供了组件 `BasicLayout.vue` 的显示，其中包含 `router-view` 标签
    path: "/",
    component: () =>
      import(/*webpackChunkName: "layout" */ "../layouts/BasicLayout.vue"),
    // // 下面是定义哪些组件显示在 `BasicLayout.vue` 的 `router-view` 标签中
    children: [
      // 分析页面的显示
      {
        path: "/",
        // 仪表盘下面有个分析页
        // 匹配到根路径时，将会重定位到 `/dashboard/analysis` 的 path 的位置
        redirect: "/dashboard/analysis"
      },
      // {
      //   path: "/dashboard",
      //   redirect: "/dashboard/analysis"
      // },
      // {
      //   path: "/dashboard/analysis",
      //   name: "analysis",
      //   component:() => import(/*webpackChunkName: "dashboard" */ "../views/Dashboard/Analysis.vue"),
      // }
      {
        // 如果匹配到 `/dashboard` 直接渲染 `BasicLayout.vue`
        path: "/dashboard",
        name: "dashboard",
        // render 方式直接渲染我们的“router-view”，但是渲染什么呢？
        component: { render: h => h("router-view") },
        // dashboard 下面的子路由（嵌套路由），这个子嵌套是为了什么呢？
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            // 异步调用组件显示
            component: () => import(/*webpackChunkName: "dashboard" */ "../views/Dashboard/Analysis.vue"),
          }
        ],
      },
      // form 表单
      {
        path: "/form",
        name: "form",
        component: { render: h => h("router-view") },
        children: [
          // 基础表单
          {
            path: "/form/basic-form",
            name: "basicform",
            component: () => import(/*webpackChunkName: "form" */ "../views/Forms/BasicForm.vue"),
          },
          // 分步表单
          {
            path: "/form/step-form",
            name: "stepform",
            // component:() => import(/*webpackChunkName: "form" */ "../views/Forms/StepForm"),
            component: { render: h => h("router-view") },
            children: [
              // step1
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info"
              },
              {
                // form 表单的第一页，也就是信息页
                path: "/form/step-form/info",
                name: "info",
                component: () =>
                  import(
                /*webpackChunkName: "form" */ "../views/Forms/StepForm/Step1.vue"
                  )
              },
              {
                // 确认页
                path: "/form/step-form/confirm",
                name: "confirm",
                component: () =>
                  import(
                /*webpackChunkName: "form" */ "../views/Forms/StepForm/Step2.vue"
                  )
              },
              {
                // 结果页
                path: "/form/step-form/result",
                name: "result",
                component: () =>
                  import(
                /*webpackChunkName: "form" */ "../views/Forms/StepForm/Step3.vue"
                  )
              }
            ]
          }
        ],
      }
    ]
  },
  // 我们的路由不可能覆盖到我们所有的路径情况，当用户随便输入的时候，我们要给她一个有效的反馈。我们可以用一个通配符“*”
  // 然后再 views 下创建这个 vue 页面。
  {
    path: "*",
    name: "404",
    // 不用404的方式，直接引入后使用
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// router 路由下会有个 beforeEach 
// 3个参数：to，from， next
// to：将要到达的路由
// from：当前的路由
// next：相当于下一步，当我们的处理钩子结束后需要执行 next 否则他就不会跳转了
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
})

// NProgress 开始之后要有个结束
router.afterEach(() => {
  NProgress.done();
});


export default router;
