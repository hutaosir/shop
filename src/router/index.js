import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'


Vue.use(VueRouter)

// VueRouter实例
let router = new VueRouter({
   
    // 配置路由
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
      },
})

router.beforeEach(async (to,from,next)=>{
  // to:可以获取到你要跳转到的那个路由信息
  // from：可以获取到你从哪个路由而来的信息
  // next：放行函数 next()放行 next(path)放行到指令路由
 
  if(localStorage.getItem('TOKEN')){
    //已经登录了，就限制不能再去登录页了 
    if(to.path=='/login'){
      next('/home')
    }else{
      // 如果能获取用户信息
      if(store.state.user.userInfo.name){
        next()
        // 如果不能获取用户信息
       
      }else{
        // 派遣执行函数
        try {
          // 如果还是获取不到
          await store.dispatch('getUserInfo')
          next()
          
          // 如果token过期了
        } catch (error) {
         await store.dispatch('userLogout')
          next('/login')

        }
      }
    }
  }else{
    let toPath = to.path
    if(toPath.indexOf('trade')!=-1||toPath.indexOf('/pay')!==-1||toPath.indexOf('/center')!==-1){
      next('/login')
    }else{
      next()
    }
    
  }
  
})

export default router;