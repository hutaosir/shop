<template>
  <div>
      <TypeNav/>
      <div class="main">
            <div class="py-container">
                <!--bread-->
                <div class="bread">
                    <ul class="fl sui-breadcrumb">
                        <li>
                            <a href="#">全部结果</a>
                        </li>
                    </ul>
                    <ul class="fl sui-tag">
                        <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
                        <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">×</i></li>
                        <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(':')[1]}}<i @click="removeTrademark">×</i></li>
                        <li class="with-x" v-for="(pro,index) in searchParams.props" :key="pro.split(':')[0]">{{pro.split(':')[1]}}<i @click="removeAttrInfo(index)">×</i></li>
                    </ul>
                </div>
                <!--selector-->
                <!-- 自定义事件进行子传父 -->
                <SearchSelector @trademarkInfo='trademarkInfo' @attrInfo='attrInfo'/>
                <!--details-->
                <div class="details clearfix">
                    <div class="sui-navbar">
                        <div class="navbar-inner filter">
                            <ul class="sui-nav">
                                <li :class="{active:multiple}" @click="changeOrder('1')">
                                    <a href="#">综合<i v-show="multiple" class="iconfont " :class="{'icon-long-arrow-down':isDesc,'icon-long-arrow-up':isAsc}"></i></a>
                                </li>
                                <li :class="{active:sell}" @click="changeOrder('2')">
                                    <a href="#">价格<i v-show="sell" class="iconfont" :class="{'icon-long-arrow-down':isDesc,'icon-long-arrow-up':isAsc}"></i></a>
                                </li>
                            </ul> 
                        </div>
                    </div>
                    <div class="goods-list">
                        <ul class="yui3-g">
                            <li class="yui3-u-1-5" v-for="(goods,index) in goodsList" :key="goods.id">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <!-- 进行路由跳转的时候记得带id（params）参数 -->
                                        <router-link :to="`/detail/${goods.id}`"><img v-lazy="goods.defaultImg" /></router-link>
                                    </div>
                                    <div class="price">
                                        <strong>
                                                <em>¥ </em>
                                                <i>{{goods.price}}</i>
                                            </strong>
                                    </div>
                                    <div class="attr">
                                        <a target="_blank" href="item.html"  title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{goods.title}}</a>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有<span>2000</span>人评价</i>
                                    </div>
                                    <div class="operate">
                                        <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                                        <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- 分页器 --> 
                    <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"/>
                </div>
                <!--hotsale-->
                <div class="clearfix hot-sale">
                    <h4 class="title">热卖商品</h4>
                    <div class="hot-list">
                        <ul class="yui3-g">
                            <li class="yui3-u-1-4">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <img src="./images/like_01.png" />
                                    </div>
                                    <div class="attr">
                                        <em>Apple苹果iPhone 6s (A1699)</em>
                                    </div>
                                    <div class="price">
                                        <strong>
                                                <em>¥</em>
                                                <i> 4088.00</i>
                                            </strong>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有700人评价</i>
                                    </div>
                                </div>
                            </li>
                            <li class="yui3-u-1-4">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <img src="./images/like_03.png" />
                                    </div>
                                    <div class="attr">
                                        <em>金属A面，360°翻转，APP下单省300！</em>
                                    </div>
                                    <div class="price">
                                        <strong>
                                                <em>¥</em>
                                                <i> 4088.00</i>
                                            </strong>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有700人评价</i>
                                    </div>
                                </div>
                            </li>
                            <li class="yui3-u-1-4">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <img src="./images/like_04.png" />
                                    </div>
                                    <div class="attr">
                                        <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                                    </div>
                                    <div class="price">
                                        <strong>
                                                <em>¥</em>
                                                <i> 4068.00</i>
                                            </strong>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有20人评价</i>
                                    </div>
                                </div>
                            </li>
                            <li class="yui3-u-1-4">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <img src="./images/like_02.png" />
                                    </div>
                                    <div class="attr">
                                        <em>Apple苹果iPhone 6s (A1699)</em>
                                    </div>
                                    <div class="price">
                                        <strong>
                                                <em>¥</em>
                                                <i> 4088.00</i>
                                            </strong>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有700人评价</i>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector"

//import {mapState} from 'vuex'
import {mapGetters,mapState} from 'vuex'
export default {
    name:'Search',
    data(){
        return{
            searchParams:{
                category1Id:"", 
                category2Id:"", 
                category3Id:"", 
                categoryName:"",
                keyword:"",
                // 默认且降序 
                order:"1:desc",
                pageNo:1,
                pageSize:5,
                props:[],
                trademark:""
            }
        }
    },
    components:{SearchSelector},
    // 在发送请求之前先把数据交给服务器，服务器在根据情况发数据
    beforeMount(){
        Object.assign(this.searchParams,this.$route.query,this.$route.params)
    },
    mounted(){
        // this.goData()
    },
    methods:{
        goData(){
           this.$store.dispatch('getSearchList',this.searchParams)  
        },
        // 三级联动
        removeCategoryName(){
            // 把带给服务器的参数置空了，还会向服务器发请求
            // 带给服务器参数说明可有可无的：如果属性值为空的字符串还会把相应的字段带个服务器
            // 但是你把相应的字段变为undefind,当前字段不会带给服务器
            this.searchParams.category1Id = undefined
            this.searchParams.category2Id = undefined
            this.searchParams.category3Id = undefined
            this.searchParams.categoryName = undefined
            // this.goData()
            this.$router.push({'name':'search',params:this.$route.params})
        },
        
        removeKeyword(){
            this.searchParams.keyword = undefined
            // this.goData()
            this.$bus.$emit("clear")
            this.$router.push({'name':'search',query:this.$route.query})

        },
        // 上面两个可以不用调用goData(),因为watch,能监听到
        trademarkInfo(trademark){
           this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
           this.goData()
        },
        
        removeTrademark(){
            this.searchParams.trademark = undefined
            this.goData()
        },
        // 品牌
        attrInfo(attr,attrValue){
          let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
        //   去重，this.searchParams.props.indexOf(props)== -1时，说明没有相同的值
          if(this.searchParams.props.indexOf(props) == -1){
               this.searchParams.props.push(props)
               this.goData()
          }
          
          
          this.$router.push({'name':'search',query:this.$route.query})
        },
        removeAttrInfo(index){
            this.searchParams.props.splice(index,1)
            this.goData()
            this.$router.push({'name':'search',query:this.$route.query})
        },
        // 排序的操作
        changeOrder(flag){
            // 获取用户点击时，传的是1还是2
            let originOrder = this.searchParams.order
            // 把获取的值截取出来，是1还是2,也就是综合还是价格
            let originFlag = this.searchParams.order.split(":")[0]
            // 把获取的值截取出来，是desc还是asc,也就是升序还是降序
            let originSort = this.searchParams.order.split(":")[1]
            // 创建一个新的order属性值
            let newOrder = ''
            // 点击相同的值时所反馈的数据
            if(flag ==originFlag){
                newOrder = `${originFlag}:${originSort=='desc'?'asc':'desc'}`
                

            // 点击价格
            }else{
                newOrder = `${flag}:${'desc'}`
                
            }
                originOrder = newOrder
                this.searchParams.order = originOrder
                this.goData()
            },
            
            //获取点击的页数
            getPageNo(pageNo){
                this.searchParams.pageNo = pageNo
                this.goData()
            }
    },
    computed:{

    //     ...mapState({
    //         // 这里的state指的是大仓库里的state
    //         goodsList:state=>state.search.searchList.goodsList
        // })
        ...mapGetters(['goodsList']),

        // 计算综合的属性
        multiple(){
            return this.searchParams.order.indexOf("1")!=-1
        },

        // 计算销量的属性
        sell(){
            return this.searchParams.order.indexOf("2")!=-1
        },

        // 升序
        isAsc(){
            return this.searchParams.order.indexOf('asc')!=-1
        },
        // 降序
        isDesc(){
            return this.searchParams.order.indexOf('desc')!=-1
        },
        ...mapState({
            total:state =>state.search.searchList.total
        })
      
    },
    watch:{
        // deep:true,
        $route(newValue,oldValue){
            Object.assign(this.searchParams,this.$route.query,this.$route.params)
            this.goData()
            this.searchParams.category1Id = undefined
            this.searchParams.category2Id = undefined
            this.searchParams.category3Id = undefined
            
        }
    }
}
</script>

<style lang="less">

    .main{
        margin: 10px 0;
        .py-container{
            width: 1200px;
            margin: 0 auto;
            .bread{
                margin-bottom: 5px;
                overflow: hidden;
                .sui-breadcrumb{
                    padding: 3px 15px;
                    margin: 0;
                    font-weight: 400;
                    border-radius: 3px;
                    float:left;
                    li{
                        display: inline-block;
                        line-height: 18px;
                        a{
                            color: #666;
                            text-decoration: none;
                            &:hover{
                                color: #4cb9fc;
                            }
                        }
                    }
                }
                .sui-tag{
                    margin-top: -5px;
                    list-style: none;
                    font-size: 0;
                    line-height: 0;
                    padding: 5px 0 0;
                    margin-bottom: 18px;
                    float: left;
                    .with-x{
                        font-size: 12px;
                        margin: 0 5px 5px 0;
                        display: inline-block;
                        overflow: hidden;
                        color: #000;
                        background: #f7f7f7;
                        padding: 0 7px;
                        height: 20px;
                        line-height: 20px;
                        border: 1px solid #dedede;
                        white-space: nowrap;
                        transition:color 400ms;
                        cursor: pointer;
                        i{
                            margin-left: 10px;
                            cursor: pointer;
                            font: 400 14px tahoma;
                            display: inline-block;
                            height: 100%;
                            vertical-align: middle;
                        }
                        &:hover{
                            color: #28a3ef;
                        }
                    }
                }
            }
            
            .details{
                margin-bottom: 5px;
                .sui-navbar{
                    overflow: visible;
                    margin-bottom: 0;
                    .filter{
                        min-height: 40px;
                        padding-right: 20px;
                        background: #fbfbfb;
                        border: 1px solid #e2e2e2;
                        padding-left: 0;
                        border-radius: 0;
                        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
                        .sui-nav{
                            position: relative;
                            left: 0;
                            display: block;
                            float: left;
                            margin: 0 10px 0 0;
                            li{
                                float: left;
                                line-height: 18px;
                                a{
                                    display: block;
                                    cursor: pointer;
                                    padding: 11px 15px;
                                    color: #777;
                                    text-decoration: none;
                                }
                                &.active{
                                    a{
                                        background: #e1251b;
                                        color: #fff;
                                    }
                                }
                            }
                        }
                    }
                }
                .goods-list{
                    margin: 20px 0;
                    ul{
                        display:flex;
                        flex-wrap:wrap;
                        li{
                            height: 100%;
                            width: 20%;
                            margin-top: 10px;
                            line-height: 28px;
                            .list-wrap{
                                .p-img{
                                    padding-left: 15px;
                                    width: 215px;
                                    height: 255px;
                                    a{
                                        color: #666;
                                        img{
                                            max-width: 100%;
                                            height: auto;
                                            vertical-align: middle;
                                        }
                                    }
                                }
                                .price{
                                    padding-left: 15px;
                                    font-size: 18px;
                                    color: #c81623;
                                    strong{
                                        font-weight: 700;
                                        i{
                                            margin-left: -5px;
                                        }
                                    }
                                }
                                .attr{
                                    padding-left: 15px;
                                    width: 85%;
                                    overflow: hidden;
                                    margin-bottom: 8px;
                                    min-height: 38px;
                                    cursor: pointer;
                                    line-height: 1.8;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 2;
                                    a{
                                        color: #333;
                                        text-decoration: none;
                                    }
                                }
                                .commit{
                                    padding-left: 15px;
                                    height: 22px;
                                    font-size: 13px;
                                    color: #a7a7a7;
                                    span{
                                        font-weight: 700;
                                        color: #646fb0;
                                    }
                                }
                                .operate{
                                    padding: 12px 15px;
                                    .sui-btn{
                                        display: inline-block;
                                        padding: 2px 14px;
                                        box-sizing: border-box;
                                        margin-bottom: 0;
                                        font-size: 12px;
                                        line-height: 18px;
                                        text-align: center;
                                        vertical-align: middle;
                                        cursor: pointer;
                                        border-radius: 0;
                                        background-color: transparent;
                                        margin-right: 15px;
                                    }
                                    .btn-bordered{
                                        min-width: 85px;
                                        background-color: transparent;
                                        border: 1px solid #8c8c8c;
                                        color: #8c8c8c;
                                        &:hover{
                                            border: 1px solid #666;
                                            color: #fff!important;
                                            background-color: #666;
                                            text-decoration: none;
                                        }
                                    }
                                    .btn-danger{
                                        border: 1px solid #e1251b;
                                        color: #e1251b;
                                        &:hover{
                                            border: 1px solid #e1251b;
                                            background-color: #e1251b;
                                            color:white!important;
                                            text-decoration: none;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                
            }
            .hot-sale{
                margin-bottom: 5px;
                border: 1px solid #ddd;
                .title{
                    font-weight: 700;
                    font-size: 14px;
                    line-height: 21px;
                    border-bottom: 1px solid #ddd;
                    background: #f1f1f1;
                    color: #333;
                    margin: 0;
                    padding: 5px 0 5px 15px;
                }
                .hot-list{
                    padding: 15px;
                    ul{
                        display:flex;
                        li{
                            width:25%;
                            height: 100%;
                            .list-wrap{
                                .p-img,.price,.attr,.commit{
                                    padding-left: 15px;
                                }
                                .p-img{
                                    img{
                                        max-width: 100%;
                                        vertical-align: middle;
                                        border: 0;
                                    }
                                }
                                .attr{
                                    width: 85%;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 2;
                                    overflow: hidden;
                                    margin-bottom: 8px;
                                    min-height: 38px;
                                    cursor: pointer;
                                    line-height: 1.8;
                                }
                                .price{
                                    font-size: 18px;
                                    color: #c81623;
                                    strong{
                                        font-weight: 700;
                                        i{
                                            margin-left: -5px;
                                        }
                                    }
                                }
                                .commit{
                                    height:22px;
                                    font-size: 13px;
                                    color: #a7a7a7;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .footer{
        background-color: #eaeaea;
        .footer-container{
            width: 1200px;
            margin: 0 auto;
            padding: 0 15px;
            .footerList{
                padding: 20px;
                border-bottom: 1px solid #e4e1e1;
                border-top: 1px solid #e4e1e1;
                overflow: hidden;
                padding-left: 40px;
                .footerItem{
                    width: 16.6666667%;
                    float: left;
                    h4{
                        font-size: 14px;
                    }
                    .footerItemCon{
                        li{
                            line-height: 18px;
                        }
                    }
                    &:last-child img{
                        width: 121px;
                    }
                }
            }
            .copyright{
                padding: 20px;
                .helpLink{
                    text-align: center;
                    li{
                        display: inline;
                        .space {
                            border-left: 1px solid #666;
                            width: 1px;
                            height: 13px;
                            background: #666;
                            margin: 8px 10px;
                        }
                    }
                }
                p{
                    margin: 10px 0;
                    text-align: center;
                }
            }
        }
    }


</style>