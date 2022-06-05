// 登录与注册
import { reqGetCode,reqUserRegister,reqUserLogin,reqGetUserInfo,reqLogout } from "@/api"
import {setToken,getToken,removeToken} from '@/utils/token'

const state = {
    // 验证码
    code:'',
    // token
    token:getToken(),
    userInfo:{}
}
const mutations = {
    // 获取验证码放入仓库
    GETCODE(state,code){
        state.code=code
    },
    // 登录
    GETUSERLOGIN(state,token){
        state.token=token
    },
    // 获取用户信息
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    // 退出登录
    CLEAR(state){
        state.code=''
        state.userInfo=''
        removeToken()
        
    }
}
const actions = { 
    // 获取验证码
   async getCode({commit},phone){
        let result =await reqGetCode(phone)
        if(result.code==200){
            commit("GETCODE",result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error("faile"))
        }
    },
    // 注册
    async getUserRegister({commit},user){
    let result = await reqUserRegister(user)
    if(result.code==200){
        
        return 'ok'
    }else{
        return Promise.reject(new Error('faile'))
    }
   
    },
    // 登录业务{token}
    async getUserLogin({commit},login){      
       let result = await reqUserLogin(login)
       if(result.code==200){
           commit('GETUSERLOGIN',result.data.token)
        // 调用函数，使token实现本地存储
        setToken(result.data.token)

       }else{
           return Promise.reject(new Error('faile'))
       }
    },
    // 获取用户信息
    async getUserInfo({commit}){
       let result = await reqGetUserInfo()
       
       if(result.code==200){
           commit('GETUSERINFO',result.data)
           
       }
    },

    // 退出登录
    async userLogout({commit}){
        let result = await reqLogout()
        if(result.code==200){
            commit('CLEAR')
            return 'ok'
        }else{
            return Promise.reject(new Error("faile"))
        }
        localStorage.clear()
    }
    
}
const getters ={}

export default{
    state,
    mutations,
    actions,
    getters
}