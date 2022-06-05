// 引进mock.js模块
import Mock from 'mockjs'
// 把json数据格式引入进来json数据格式根本没有对外暴露，但是可以引入
// webpack默认对外暴露的：图片，json文件
import banner from './banner.json'
import floor from './floors.json'

// mock数据：第一个参数请求地址，第二个参数请求数据
Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})
