// 获取服务器返回的数据
import { reqAddOrUpdateShopCart, reqGoodsInfo } from "@/api"
// 这里要求用的uuid只能使用一次就不能再变
import {getUUID} from "@/utils/uuid_token"
const state = {
        goodsInfo:{},
        uuid_token:getUUID()
}
const mutations = {
        GETGOODSINFO(state,goodsInfo){
            state.goodsInfo = goodsInfo
        }
}
const actions = {
    // 获取产品信息的action
    async getGoodsInfo({commit},skuId){
       let result = await reqGoodsInfo(skuId)
       if(result.code==200){
           commit('GETGOODSINFO',result.data)
       }
       
    },
    // 将产品添加到购物车中
           async addOrUpdateShopCart({commit},{skuId,skuNum}){
            // 加入购物车返回的解构
            // 加入购物车以后(发请求)，前台将参数带给服务器
            // 服务器写入数据成功，并没有返回其他的数据，只是返回code=200,代表这次操作成功了
            // 因为服务器没有返回其他数据，因此不需要进行数据存储
                let result = await reqAddOrUpdateShopCart(skuId,skuNum)
                if(result.code==200){
                    return 'ok'
                }else{
                    return Promise.reject(new Error('fail'))
                }
            }

}
// 简化数据
const getters = {
    // 路径导航简化的数据
    categoryView(state){
        // 这里传空对象是因为刚开始的goodsInfo是空对象，传过去也是空的，而在空的对象    里调用属性就会报错
        // 如果这里没报错的话说明你家网络太好了，刷新一下试试
        return state.goodsInfo.categoryView || {}
    },
    // 简化产品信息的数据
    skuInfo(){
        return state.goodsInfo.skuInfo || {}
    },

    // 产品售卖属性的简化
    spuSaleAttrList(){
        return state.goodsInfo.spuSaleAttrList|| []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}