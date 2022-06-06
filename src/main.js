import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
// 导航栏
import TypeNav from '@/components/TypeNav'
// 轮播图
import Consousel from '@/components/Consousel'
// 分页器
import Pagination from '@/components/Pagination'
import {reqCategoryList} from '@/api'
import {reqGetSearchInfo} from '@/api'
import * as API from '@/api'
import { Button,MessageBox } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 去掉生产提示
Vue.config.productionTip = false

Vue.component(TypeNav.name,TypeNav)
Vue.component(Consousel.name,Consousel)
Vue.component(Pagination.name,Pagination)
// element-ui注册全局
Vue.component(Button.name, Button);
// element-ui挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

import store from '@/store'

import '@/mock/mockServe'
// 引入swiper样式
import 'swiper/css/swiper.css'

// 图片懒加载
import VueLazyload from 'vue-lazyload'
import hutao from '@/assets/hutao.webp'

// 表单验证
Vue.use(VueLazyload, {
  
  loading: hutao,
})


reqCategoryList()
reqGetSearchInfo()
new Vue({
  render: h => h(App),
  // 全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  
  // 注册路由
  router,

  // 注册仓库，组件实例会多家一个属性$store
  store
}).$mount('#app')
