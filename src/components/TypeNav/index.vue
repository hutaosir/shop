<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派 -->
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch">
            <!-- 一级联动 -->
            <div
              class="item bo"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
            >
              <h3
                @mouseenter="changeIndex(index)"
                :class="{ cur: currentIndex == index }"
              >
                <a
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                  >{{ c1.categoryName }}
                </a>
              </h3>
              <!-- 二、三级联动容器 -->
              <div
                class="item-list clearfix"
                :style="{ display: currentIndex == index ? 'block' : 'none' }"
              >
                <!-- 二级联动 -->
                <div
                  class="subitem"
                  v-for="(c2, index) in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                        >{{ c2.categoryName }}
                      </a>
                    </dt>
                    <dd>
                      <!-- 三级联动 -->
                      <em
                        v-for="(c3, index) in c2.categoryChild"
                        :key="c3.categoryId"
                      >
                        <a
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                          >{{ c3.categoryName }}
                        </a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  // 组件挂载完毕，向服务器发请求
  data() {
    return {
      currentIndex: -1,
      show:true
    };
  },
  mounted() {
    this.$store.dispatch("categoryList");
    if(this.$route.path !="/home"){
      this.show = 0
    }
  },
  methods: {
    // index:鼠标移上某一个一级分类的元素的索引值
    // 正常情况（用户慢慢的操作）:鼠标进入，每一个以及分类h3，都会触发鼠标进入事件
    //非正常情况（用户操作很快）：本身全部的一级都应该触发鼠标进入事件，但是经过测试，只有部分h3触发了
    // 就是由于用户行为过快，导致浏览器反应不过来，如果当前回调函数中有一些大量的业务，有可能会出现卡顿现象
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    leaveIndex() {
      this.currentIndex = -1;
      if(this.$route.path !="/home"){
      this.show = 0
      }
    },
    enterShow(){
      if(this.$route.path!="/home"){
      this.show= true
      }
    },
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
    if(this.$route.params){
      location.params = this.$route.params;
      location.query = query;
      // 这里使query跟随路径上传参数
      this.$router.push(location);
    }
    
    }
    },
  
  },
  computed: {
    // 右侧需要的是一个函数，当使用这个函数计算属性的时候，右侧会立即执行一次
    // 注入一个参数state，其实即为大仓库中的数据
    // CATEGORYLIST(){
    //     return this.$store.state.home.categoryList
    // },
    ...mapState({
      // 这里的state指的是大仓库
      categoryList: (state) => {
        return state.home.categoryList.slice(0, -2);
      },
    }),
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      // height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //     .item-list {
          //         display: block;

          //     }
          .cur {
            background: skyblue;

            // }
          }
        }
      }
    }

    .sort-enter{
      height: 0;
      
    }

    .sort-enter-to{
      height:461px;
    
    }

    .sort-enter-active{
      overflow: hidden;
      transition: all .5s linear;
    }
    .sort-leave{
      height: 461px;
    }

    .sort-leave-to{
      height:0px
    }

    .sort-leave-active{
      overflow: hidden;
      transition: all .5s linear;
    }
  }
}
</style>