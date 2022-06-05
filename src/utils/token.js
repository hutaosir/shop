// 对外暴露你一个函数
// 把token保存在本地存储中，实现token持久化，不然一刷新token就没了
// 存储token
export const setToken=(token)=>{
    localStorage.setItem('TOKEN',token)
}

// 获取token
export const getToken=()=>{
    localStorage.getItem('TOKEN')
}

// 清除本地存储token
export const removeToken=()=>{
    localStorage.removeItem('TOKEN')
}