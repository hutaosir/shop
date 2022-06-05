// 购物车
import { reqCartList, reqDeleteCartById,reqUpdateCheckedById } from "@/api"
import { Promise } from "core-js"
const state = {
    // 购物车列表
    cartList: [],
    // 删除购物车
    deleteCartList: {},
   
}
const mutations = {
    // 购物车信息放入仓库
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    },
    // 删除购物车的内容放在仓库
    DELETECARTLISTBYSKUID(state, deleteCartList) {
        state.deleteCartList = deleteCartList
    },
   
}
const actions = {
    // 获得购物车信息
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)

        }
    },
    // 获取删除指定的购物车中的内容
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code == 200) {
            commit('DELETECARTLISTBYSKUID', result.data)

        }
    },
    // 获得选中购物中中选中的内容
    async updateCheckedListById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error("fails"))
        }
    },
    // 删除全部选中的内容
    
    deleteAllCheckedCart({dispatch,getters}){
        // 创建一个装promise的数组
        let PromiseAll = []
        // 遍历数组
        getters.cartList.cartInfoList.forEach(item => {
            // 把checked=1的全部遍历出来并放在数组里
            // 这里返回的值是promise item.isChecked==1?dispatch('deleteCartListBySkuId',item.skuId):'' 
            let promise = item.isChecked==1?dispatch('deleteCartListBySkuId',item.skuId):''
            
            PromiseAll.push(promise)
        });
        // 如果所有的promise都为true会返回一个成功的状态
        return (Promise.all(PromiseAll))
    },
    // 全选状态
    updateAllCartisChecked({dispatch,state},isChecked){
    //创建一个promise的数组
    let PromiseAll = []
    state.cartList[0].cartInfoList.forEach(item=>{
       let promise = dispatch('updateCheckedListById',{skuId:item.skuId,isChecked}) 
       PromiseAll.push(promise)
    })
    return Promise.all(PromiseAll)
    }
}
// 简化计算
const getters = {
    cartList(state) {
        return state.cartList[0] || []
    },

}

export default {
    state,
    mutations,
    actions,
    getters
}