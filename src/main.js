import Vue from "vue"
import App from "./App3.vue"
// import App from "./views/demo.vue"
// import { router } from "./router"
// import store from "./store"
import dayjs from "dayjs"
let localizedFormat = require("dayjs/plugin/localizedFormat")
dayjs.extend(localizedFormat)
dayjs().format("L LT")
require("dayjs/locale/zh-cn")
import "./assets/index.css"
Vue.config.productionTip = false
import VueAnimateNumber from "vue-animate-number"
Vue.use(VueAnimateNumber)

import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
Vue.use(ElementUI)


new Vue({
  // store,
  render: h => h(App),
}).$mount("#app")
