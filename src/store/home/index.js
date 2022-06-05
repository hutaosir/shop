// 模块化

import {reqCategoryList,reqGetBannerList, reqGetFloorList} from "@/api"; 

const state = {
    categoryList:[],
    bannerList:[],
    floorList:[]
};

const mutations = {
    // state里的state是大仓库里的，categoryList收到的是actions通过commit上传的值
        CATEGORYLIST(state,categoryList){
            state.categoryList = categoryList 
        },
        BANNERLIST(state,bannerList){
            state.bannerList = bannerList
        },
        FLOORLIST(state,floorList){
            state.floorList = floorList
        }
        
};

const actions = {
    // Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象
    // 我们会经常用到 ES2015 的参数解构来简化代码   
    async categoryList({commit}){
        let result = await reqCategoryList();
        if(result.code==200){
          commit('CATEGORYLIST',result.data)
        }
    },
    async getBannerList({commit}){
        let result = await reqGetBannerList();
        // console.log(result)
        if(result.code===200){
            commit('BANNERLIST',result.data)
        }
    },
    async getFloorList({commit}){
        let result = await reqGetFloorList()
        if(result.code===200){
            commit('FLOORLIST',result.data)
        }
    }
};

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}