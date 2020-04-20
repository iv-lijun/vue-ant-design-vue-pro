import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入我们的 ant-design-vue 这将引入我们 ant-design-vue 的50多个组件全部引入
// import Antd from "ant-design-vue";

// 引入 ant-design-vue 的样式
// 如果是要用 css 的话，后缀是 `.css`
// import "ant-design-vue/dist/antd.css";
// 如果是 less 的话，修改后缀名
// import "ant-design-vue/dist/antd.less";

// 包括我们的样式也是可以按需引入的
// import "ant-design-vue/lib/button/style";
// 引入我们所需要的组件，例如 button
// import Button from "ant-design-vue/lib/button";

// 在 babel 中配置后就不用单独写了像上面那样写了，直接改成如下写法
import { Button } from "ant-design-vue";

Vue.config.productionTip = false;

// 所有的组件都全局注册，这时候我们就可以使用了
Vue.use(Button);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
