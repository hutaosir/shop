1.  2022年4月21日
1、vue-router:
2、vue2使用vue-router@3
3、vue3使用vue-router@4

2.  2022年4月21日
1、导入css默认样式，例如reset.css,里面如果有import的话控制台会报错，解决的方式是删除里面的import
2、vue2里使用的是vuex3,使用4及以上的会报错

3.  2022年4月21日
动态展示三级联动数据
1.当我把数据放在h1时c1没有向下传递数据，导致c1所遍历的数据会空白，且在c2使用c1遍历的时候控制台报c1未定义。
原因：待定
 <div class="item bo" v-for="(c1,index) in categoryList " :key="c1.categoryId">
                            <h3>
                                <a href="">{{c1.categoryName}}</a>
                            </h3>
                            <div class="item-list clearfix">
                                <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <a href="">{{c2.categoryName}}</a>
                                        </dt>
                                        <dd>

4. 2022年4月21日

完成三级联动动态背景颜色

mouseenter与mouseleave不会产生冒泡事件和委派事件
未解决的问题：当鼠标移动全部商品分类的时候数组1的背景颜色不会停留，index不会变
问题：把样式写在hover里了
解决方式,cur类直接写在外面

5. 2022年4月21日
演示卡顿现象
正常：事件触发非常频繁，而且每一次的触发，回调函数都要去执行（如果时间很短,而且回调函数内部有计算，那么很可能出现浏览器卡顿）

节流：在规定的间隔时间范围内不会触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变成少量触发
防抖：前面的所有的触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说如果连续快速的触发，只会执行一次

6. 2022年4月22日
三级联动组件的路由跳转与传递参数
三级联动用户可以点击的：一级分类、二级分类，三级分类，当你点击的时候
Home模块跳转到Search模块，一级会把用户选中的产品（产品的名字，产品的ID）在路由跳转的时候进行传递

注意：三级联动如果使用声明式导航router-link，可以路由的跳转与传递参数
但是需要注意，出现卡顿现象

7. 2022年4月23日
问题一：在vuex中关于location与query以对象形式进行传参的问题
问题二：识别a标签与识别一级二级三级分类的方法
goSearch(event) {
      // 最好的解决方案：编程式导航+事件委派
      // 存在一些问题：事件委派，就是把全部的子节点h3、dt、dl、em的事件委派给父亲节点
      // 点击a标签的时候，才会进行路由跳转{怎样确定点击的一定是a标签}
      // 存在另一个问题，即使你能确定点击的是a标签。如何区分是一级、二级、三级分类的标签
      // 第一个问题：把子节点当中a标签，加上自定义属性data-categoryName,其余子节点都是没有的
      let element = event.target;
     
      let { categoryname, category1id, category2id, category3id } = element.dataset;
    
  
      // 如果标签上有categoryname一定是a标签
      
      if (categoryname) {
        // 一级、二级、三级分类的a标签
        let location = { name: "search" };
        let query = { categoryName:categoryname };
       
      
      if (category1id) {
        query.category1Id = category1id;
      } else if (category2id) {
        query.category2Id = category2id;
      } else {
        query.category3Id = category3id;
      }
      // 获取到当前出发这个事件的节点{h3、a、dt、dl},需要带有data-categoryname这样节点{一定是a标签}
      // 节点有一个属性dataset属性，可以获取节点的自定义属性与属性值
    //   整理完参数
    
    location.query = query;
    // 这里使query跟随路径上传参数
    this.$router.push(location);
    }
    },

需求：开发search模块中的TypeNav商品分类菜单(过渡动画效果)
过渡动画:前提组件|元素务必要有v-if|v-show指令才可以进行过渡动画

8. 2022年5月6日
轮播图的步骤就是下载swiper-导入-引入css-实例化
注意：对应版本的不同实例的代码有可能会不一样，最好看一下官网

swiper下载
yarn add swiper
稳定的可以选择版本5

导入
在需要使用轮播图的vue文件里导入
import Swiper from 'swiper'

引入css
import 'swiper/css/swiper.css'
如果忘了可以看swiper官网,可以单独写到每个需要的文件，如果需要多次使用的话可以引入用到main.js

实例
两个轮播图使用了不同的方法
因为floor文件里的数据是由Home通过父传子获得的，而数据加载完毕，v-for就会立即进行遍历，因此可以写在mounted（）里边
对于listContainer，是通过diapatch向state里索要数据的，这需要时间，而这个时候在mounted()写实例的话数据和结构还没完整加载出来，实例就开始运行了，导致轮播图运行失败，这里可以使用异步处理，比如使用定时器，当然这不是最好的方法，最好的方法是使用watch进行数据监视，如果有变化则执行handle（newValue,oldValue）{}这个函数，对于Vue.$nextTick(()=>{}),是等整个Dom完全加载完毕之后再调用里边的的函数
var mySwiper = new Swiper(this.$refs.cul, {
            // 循环
            loop: true,
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              // 点击分页器的时候也切换图片
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });

watch: {
    bannerList: {
      // 通过watch监听bannerList的属性值的变化
      // 如果执行hander,说明bannerList的数据已经改变
      // v-for执行完毕，才有完整的结构
      // nextTick：在下次Dom更新，循环结束之后，延迟执行回调。立即使用这个方法，获取更新后的Dom  
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          var mySwiper = new Swiper(".swiper-container", {
            // 循环
            loop: true,
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              // 点击分页器的时候也切换图片
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },

  9. 2022年5月7日
  search 模块开发1
  1：先静态页面 + 静态组件的拆分
  2：发请求（api）
  3：vuex（三连环）
  4：组件获取仓库数据，动态展示数据
  5:合并参数
  Object.assign(this.searchParams,this.$route.query,this.$route.params)

 6：通过上传query与params的不同，使服务器反馈不同的数据(这里只需要把query与params传给服务器就行)

 10. 2022年5月8日
search 模块开发2
1：这行代码主要是对路由进行监测，跳转的时候携带的query与params进行传参，调用goData进行调用API
watch:{
        $route(newValue,oldValue){
            Object.assign(this.searchParams,this.$route.query,this.$route.params)
            this.goData()
        }
    }


method：{
  goData(){
    this.$store.dispatch('getSearchList',this.searchParams)
  }
}


2：好处：携带的数据越少，速度会越快
            // 把带给服务器的参数置空了，还会向服务器发请求
            // 带给服务器参数说明可有可无的：如果属性值为空的字符串还会把相应的字段带个服务器
            // 但是你把相应的字段变为undefind,当前字段不会带给服务器
            this.searchParams.category1Id = undefined
            this.searchParams.category2Id = undefined
            this.searchParams.category3Id = undefined
            this.searchParams.categoryName = undefined

3：注意一点
 路由 path:'/search/:keyword?'
 这里的问号是一个坑，表示params可有可无,如果没有设置？号，就说明一定有params的值，这个时候对其参数设置为undefind或者是""都不会被影响,keywork会改变，当是网址携带的params的数据不变

4：自定义事件进行子传父
父：Search
子：SearchSelect

子：trademarkHandle(trademark){
            this.$emit('trademarkInfo',trademark)
        }

父：<SearchSelector @trademarkInfo='trademarkInfo' />
然后再通过函数进行相对应的操作

注意：这里的方法有很多，全集事件总线也可以

10. 2022年5月9日
1:平台销售属性
注意：这里的解构一个用了push 而另一个没有push,是因为后者用的是数组去接数据的，而前者是对象，能被监听到
trademarkInfo(trademark){
           this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
           this.goData()
        },

attrInfo(attr,attrValue){
          let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
          this.searchParams.props.push(props)
          this.goData()
          this.$router.push({'name':'search',query:this.$route.query})
            
        }

去重，防止多次请求
if(this.searchParams.props.indexOf(props) == -1){
               this.searchParams.props.push(props)
               this.goData()
          }

2.排序操作（一个小重点）

10. 2022年5月12日
1.排序操作
思路：先在点击事件中获取事件反馈回来的数据，再进行判断，判断的事件有两个，一个是点击相同的换箭头，一个是换了一个选项
更改后的数据应该上传给data里，再上传给仓库中的actions，让actions进行逻辑处理，上传给服务器，从服务器得到的数据，上传给mutation,mutation把值放在state里，需要用到的组件再通过映射获取数据

2.分页功能的实现
分析：
需要知道当前是第几个：pageNo字段代表当前页数
需要知道每一个需要展示多少条数据：pageSize字段进行代表
需要知道整个分页器一共需要多少条数据：total字段进行代表
需要知道分页器连续页面个数：5|7

11. 2022年5月13日
1:分页器的静态实现
computed:{
    totalPage(){
      // 向上取整
      return Math.ceil(this.total/this.pageSize)
    },
    startAndEnd(){
      let start = 0, end = 0
      // 解构写法
      const {pageNo,totalPage,continues} = this
      // 非正常情况下，totalPage的总页数比continues少
      if(totalPage<continues){
        start = 1
        end = totalPage
      }else{
        // 正常情况下
        start = pageNo-parseInt(continues/2)
        end = pageNo+ parseInt(continues/2)
        // 如果pageNo为1的情况下，会出现负数，这是不允许出现的
        if(start<1){
          start = 1
          end =continues
        }
        // 如果最后的默认也选中的是最后一个的话，会比totalPage多,这是不允许的
        if(end>totalPage){
          end = totalPage
          start = totalPage - continues +1
        }
      }
      return {start,end}
    }
  }

};

2:如何获取页数
1 这是一个子传父参数的形式
所以用自定义属性，当然还有其他方式
每一个按钮都绑定一个@click="$emit('targetfunction',params)"
父组件接到数据后进行数据处理
把数据放到data里
再利用goData()上传数据
服务器接到数据后返回数据
接到数据后页面进行数据渲染

12. 2022年5月13日
1:分页器添加属性
根据:class="{active:条件}"
直接加中间就行了

2:滚动行为
直接加载路由 文件的实例里面
scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  },

  12. 2022年5月13日
  1:<dl v-for="(spuSaleAttr,index) in spuSaleAttrList" :key="spuSaleAttr.id">
                <dt class="title" >{{spuSaleAttr.saleAttrName}}</dt>
                <dd changepirce="0" class="active" v-for="(spuSaleAttrValue,index) in spuSaleAttr.spuSaleAttrValueList" :key="spuSaleAttrValue.id">{{spuSaleAttrValue.saleAttrValueName}}</dd>
    </dl>
这里的v-for一定要写在dl,不然数据spuSaleAttr没办法共用


2:排他思想(算法)
如果有同一组元素，我们想要某一个元素实现某种样式，需要用到循环的排他思想算法：

所有元素全部清除样式（干掉其他人）
给当前元素设置样式（留下我自己）
注意顺序不能颠倒，首先干掉其他人，再设置自己

3:在给多个图片通过判断只给一个图片加一个属性时,可以在data(){return{}}里添加一个数据，默认值可以为0，再通过上面遍历的index是否相等

2022年5月18日
1：放大镜涉及css的的内容，需要再学相关知识在返回来学

2：购买产品个数操作

12. 2022年5月21日
1:当数据过于复杂像传对象这种的话考虑本地存储
当然如果不考虑美观的话也是能成功的，只是不太美观
sessionStorage.setItem("SKUINFO",JSON.stringify(this.skuInfo))
SON.parse(sessionStorage.getItem("SKUINFO"))

13. 2022年5月21日
1：需求：使用uuid的值在第一次赋值之后就不会再改变
// 单例
export const getUUID = ()=>{
    // 从本地赋值给uuid_taken
    let uuid_taken = localStorage.getItem('UUIDTAKEN')
    // 如果本地没有值，进行下面的程序
    // 如果本地有值，则不进行下面的if解构
    if(!uuid_taken){
        uuid_taken = uuidv4()
        localStorage.setItem('UUIDTAKEN',uuid_taken)
    }
    return uuid_taken
}

<!-- 在请求拦截器写这段代码是因为无法用接口--后端没有这个接口，无法传参 -->
requests.interceptors.request.use((config)=>{
    if(store.state.detail.uuid_token){
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // config：配置对象，对象里边有一个属性非常重要，header请求头
    nprogress.start();
    return config;
});


13. 2022年5月21日
1:输入框的值
<!-- 这里可以用节流进行操作 -->
async handle(type,disNum,cartInfo){
        // type：为了区分这三个元素
        // disNum形参：+变化量（1）=变化量（-1）input最终的个数（并不是变化量）
        // cartInfo：哪一个产品（id）
        // 向服务器发请求，修改数量
        switch(type){
          case "add":
            // 带给服务器的变化量
            disNum=1;
            break;
          case "redu":
            disNum=cartInfo.skuNum>1?-1:0;
            break;
          case "change":
            // 非正常情况下,就是出现中文
            if(isNaN(disNum)|| disNum<1){
              disNum=0
              alert("请输入数字")
              // 正常情况下
            }else{
              disNum = parseInt(disNum)- cartInfo.skuNum
            }
            break;
        }
        // 派发action
        try {
          await this.$store.dispatch("addOrUpdateShopCart",{
            skuId:cartInfo.skuId,
            skuNum:disNum
          });
          this.goData();
        } catch (error) {
          
        }
      }

2:这里涉及到promise，最好去MDN（需要再次了解）
<!-- 删除选中的内容-->
      deleteAllCheckedCart({dispatch,getters}){
     <!-- 创建一个装promise的数组 -->
        let PromiseAll = []
        <!-- 遍历数组 -->
        getters.cartList.cartInfoList.forEach(item => {
          <!--把checked=1的全部遍历出来并放在数组里 -->
          <!-- 这里返回的值是promise item.isChecked==1?dispatch('deleteCartListBySkuId',item.skuId):'' -->
            let promise = item.isChecked==1?dispatch('deleteCartListBySkuId',item.skuId):''
            PromiseAll.push(promise)
        });
        <!-- 如果所有的promise都为true会返回一个成功的状态 -->
        return (Promise.all(PromiseAll))
    }

   15. 2022年5月21日
   登录注册页面
   1：把对应的数据发给服务器-服务器相应后发给客户端-使用vuex-把获取的数据进行使用
   2：token是登录时服务器发送的，用于登录状态
   3：vuex与token的数据保留不是持久的，所以得把token进行本地存储
   3：退出登录时，需要清除登录时获得得数据，并且把本地存储的token清除，再跳转到首页

   16. 2022年6月2日
   <!-- 前置路由守卫 -->
   router.beforeEach(async (to,from,next)=>{
  // to:可以获取到你要跳转到的那个路由信息
  // from：可以获取到你从哪个路由而来的信息
  // next：放行函数 next()放行 next(path)放行到指令路由
 
  if(store.state.user.token){
    //已经登录了，就限制不能再去登录页了 
    if(to.path=='/login'){
      next('/home')
    }else{
      // 如果能获取用户信息
      if(store.state.user.userInfo.name){
        next()
        // 如果不能获取用户信息
       
      }else{
        // 派遣执行函数
        try {
          // 如果还是获取不到
          await store.dispatch('getUserInfo')
          next()
          
          // 如果token过期了
        } catch (error) {
         await store.dispatch('userLogout')
          next('/login')

        }
      }
    }
  }else{
    next()
  }
  
})


// 获取用户信息
登录时刷新跳出登录额解决形式
在请求头里的获取存在本地里的token
    if(store.state.user.token){
        config.headers.token = store.state.user.token

    }else if (localStorage.getItem('TOKEN'))  {
        config.headers.token = localStorage.getItem('TOKEN')
    }

  17. 2022年6月3日
  userDefaultAddress(){
        // find：选中数组中符合条件的数组返回，为最终结果
        return this.addressInfo.find(item=>item.isDefault==1)
      }

  18.2022年6月4日
  1.做一个二维码(qrcode)

  2.用element-ui做弹框时存在滚动会使页面抖动