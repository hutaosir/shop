//API接口进行统一管理
 import requests from './request'
 import mockRequests from './mockAjax'


//  三级联动接口
// /api/product/getBaseCategoryList

export const reqCategoryList = ()=>{
    // 发请求:axios发请求返回的结果promise对象
   return requests({url:'/product/getBaseCategoryList',method:'get'});
}   

// 获取banner（Home首页轮播图接口）
export const reqGetBannerList =()=>{
    return mockRequests({url:'/banner',method:'get'})
}

// 获取floorList
export const reqGetFloorList =()=>{
    return mockRequests({url:'/floor',method:'get'})
}

export const reqGetSearchInfo =(params)=>requests({url:'/list',method:'post',data:params})

// 获取信息详情
export const reqGoodsInfo = (skuId) => requests({url:`/item/${skuId}`,method:'get'})

// /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId,skuNum) =>requests({url:`/cart/addToCart/${ skuId }/${ skuNum }`,method:'post'})

// 获取购物车信息
// /api/cart/cartList
export const reqCartList = ()=>requests({url:'/cart/cartList',method:'get'})

// 删除购物车的接口
//  /api/cart/deleteCart/{skuId}
export const reqDeleteCartById= (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

//求换商品选中状态 
// /api/cart/checkCart/{skuID}/{isChecked}
export const reqUpdateCheckedById = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

// 获取验证码
// /api/user/passport/sendCode/{phone}
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})


// 注册
// '/api/user/passport/register'
export const reqUserRegister=(data)=>requests({url:'/user/passport/register',data,method:"post"})

// 登录
// /api/user/passport/login

export const reqUserLogin=(data)=>requests({url:'/user/passport/login',data,method:'post'})

// 获取用户信息
// 带着token找信息
//api/user/passport/auth/getUserInfo

export const reqGetUserInfo=()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})

// 退出登录
//api/user/passport/logout
export const reqLogout =()=>requests({url:'/user/passport/logout',method:'get'})

// 获取用户地址信息
//api/user/userAddress/auth/findUserAddressList
export const reqAddressInfo = () =>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

// 获取交易页地址
// /api/order/auth/trade
export const reqOrderInfo =() =>requests({url:'/order/auth/trade',method:'get'})

// 提交订单
// /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

// 获取支付信息
// /api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

// 获取我的订单列表
// /api/order/auth/{page}/{limit}
export const reqMyOrderInfo =(page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})