// 把路由配置信息放这里，项目大的时候容易维护
// 注册一级路由
// import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from "@/pages/Detail"
import AddCartSuccess from "@/pages/AddCartSuccess"
import ShopCart from "@/pages/ShopCart"
import Trade from "@/pages/Trade"
import Pay from "@/pages/Pay"
import PaySuccess from "@/pages/PaySuccess"
import Center from "@/pages/Center"
// 注册二级路由
import myOrder from "@/pages/Center/myOrder"
import groupOrder from "@/pages/Center/groupOrder"

export default [
    {
        path:'/center',  
        component:Center,
        meta:{show:true},
        redirect:'/center/myOrder',
        children:[
            {
                path:'myorder',
                component:myOrder
            },
            {
                path:'grouporder',
                component:groupOrder
            },
        ]
    },
    {
        path:'/paySuccess',  
        component:PaySuccess,
        meta:{show:true}
    },
    {
        path:'/pay',  
        component:Pay,
        meta:{show:true},
        beforeEnter: (to, from, next) => {
            if(from.path=="/trade"){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:'/trade',  
        component:Trade,
        meta:{show:true},
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 必须是在shopCart
            if(from.path=="/ShopCart"){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:'/ShopCart',  
        component:ShopCart,
        meta:{show:true}
    },
    {
        name:'addCartSuccess',
        path:'/addCartSuccess',  
        component:AddCartSuccess,
        meta:{show:true}
    },
    {
        name:'detail',
        path:'/detail/:skuId',
        component:Detail,
        meta:{show:true}
      },
    {
      name:'home',
      path:'/home',
      component:()=>import('@/pages/Home'),
      meta:{show:true}
    },

    {
        path:'/login',
        component:Login,
        meta:{show:false}
    },

    {
        path:'/register',
        component:Register,
        meta:{show:false}
    },

    {
        name:'search',          
        path:'/search/:keyword?',
        component:Search,
        meta:{show:true}
    },
    

    {
        path:'*',
        redirect:'/home'
    }
]