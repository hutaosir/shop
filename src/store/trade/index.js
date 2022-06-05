// 交易仓库
import { reqAddressInfo,reqOrderInfo } from "@/api"

const state ={
    address:[],
    order:{}
   
}

const mutations = {
    // 把地址信息放在state
    GETADDRESSINFO(state,address){
        state.address =address
    },
    // 把获取的交易信息放在state
    GETORDERINFO(state,order){
        state.order = order
        
    }
}

const actions ={
    // 获取地址信息
    async getAddressInfo({commit}){
        let result = await reqAddressInfo()
        if(result.code==200){
            commit('GETADDRESSINFO',result.data)
        }
    },
    // 获取交易页信息
    async getOrderInfo({commit}){
        let result =await reqOrderInfo()
        if(result.code==200){
            commit('GETORDERINFO',result.data)
        }
    }
}

const getters = {}

export default{
    state,
    actions,
    mutations,
    getters
}