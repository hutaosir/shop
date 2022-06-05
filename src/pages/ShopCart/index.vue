<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cartInfo, index) in cartInfoList"
          :key="cartInfo.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked"
              @change="updateCheck(cartInfo, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">{{ cartInfo.skuName }}</div>
          </li>
          <li class="cart-list-con3"></li>
          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handle('redu', -1, cartInfo)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cartInfo.skuNum"
              minnum="1"
              class="itxt"
              @change="handle('change', $event.target.value, cartInfo)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handle('add', 1, cartInfo)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.skuPrice * cartInfo.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a @click="deleteCart(cartInfo)" class="sindelet">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked&&cartInfoList.length>0" @click="updateAllCartChecked" />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrices }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  methods: {
    goData() {
      this.$store.dispatch("getCartList");
    },
    handle: throttle(async function (type, disNum, cartInfo) {
      {
        // type：为了区分这三个元素
        // disNum形参：+变化量（1）=变化量（-1）input最终的个数（并不是变化量）
        // cartInfo：哪一个产品（id）
        // 向服务器发请求，修改数量
        switch (type) {
          case "add":
            // 带给服务器的变化量
            disNum = 1;
            break;
          case "redu":
            disNum = cartInfo.skuNum > 1 ? -1 : 0;
            break;
          case "change":
            // 非正常情况下,就是出现中文
            if (isNaN(disNum) || disNum < 1) {
              disNum = 0;
              alert("请输入数字");
              // 正常情况下
            } else {
              disNum = parseInt(disNum) - cartInfo.skuNum;
            }
            break;
        }
        // 派发action
        try {
          await this.$store.dispatch("addOrUpdateShopCart", {
            skuId: cartInfo.skuId,
            skuNum: disNum,
          });
          this.goData();
        } catch (error) {}
      }
    }, 1000),
    // deleteCartListBySkuId
    async deleteCart(cartInfo) {
      try {
        //  如果删成功再次发请求获取新的数据进行展示
        await this.$store.dispatch("deleteCartListBySkuId", cartInfo.skuId);
        this.goData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 选中购物车的某一项
    async updateCheck(cartInfo, event) {
      try {
        // 修改数据成功，再次或群服务器数据
        // 接口要的是1或者是0，而不是布尔值，所以的把对应的布尔值转成数字
        let isChecked = event.target.checked ? "1" : "0";
        await this.$store.dispatch("updateCheckedListById", {
          skuId: cartInfo.skuId,
          isChecked: isChecked,
        });
        this.goData();
      } catch (error) {
        // 如果失败提示
        alert(error.message)
      }
    },
    // 删除全部选中的内容
    async deleteAllChecked(){
     try {
       await this.$store.dispatch('deleteAllCheckedCart')
       this.goData()
     } catch (error) {
       alert(error.message)
     }
    },
    // 修改全选状态
    async updateAllCartChecked(event){
      let isChecked = event.target.checked?"1":"0"
      try {
         await this.$store.dispatch("updateAllCartisChecked",isChecked)
         this.goData()
      } catch (error) {
        alert("购物车为空")
      }
     
    },
  
  },
  computed: {
    //使组件获取购物车仓库里的值
    ...mapGetters(["cartList"]),
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    // 合计价格
    totalPrices() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        sum += item.skuPrice * item.skuNum;
      });
      return sum;
    },
    // 全选
    isAllChecked() {
      return this.cartInfoList.every((item) => item.isChecked == 1);
      
    },
  },
  mounted() {
    
    this.goData();
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>