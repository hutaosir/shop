import { reqGetSearchInfo } from "@/api";

// 模块化
const state = {
    searchList:{}
};

const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
};

const actions = {
    // params={}表示默认情况下传空对象
    async getSearchList({commit},params={}){
       let result = await reqGetSearchInfo(params)
       if(result.code==200){
        commit('GETSEARCHLIST',result.data)
       }
       

    }
};


// 计算属性
// 项目当中getter主要的作用是，简化仓库中的数据（简化数据而生）
// 可以把我们将来再组件当中需要用的数据简化一下{将来组件在获取数据的时候就方便了}
const getters = {
    // 当前仓库中的state，并非大仓库中的state
    goodsList(state){
        // 原因
        // 正常情况下会返回数组
        // 假如网络不给力没有网，searchList。goodsList应该返回的是underfined
        return state.searchList.goodsList || []
    },
    attrsList(){
        return state.searchList.attrsList
    },
    trademarkList(){
        return state.searchList.trademarkList
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}
