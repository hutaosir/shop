<template>
  <div class="pagination">
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="startAndEnd.start  > 1" @click="$emit('getPageNo',1)">1</button>
    <button v-if="startAndEnd.start > 2" >···</button>
    <!-- 中间结构 -->
    <button v-for="(pages,index) in startAndEnd.end" :key="index" v-if="pages>=startAndEnd.start" @click="$emit('getPageNo',pages)" :class="{active:pageNo==pages}">{{pages}}</button>

    <button v-if="startAndEnd.end<totalPage-1">···</button>
    <button v-if="startAndEnd.end<totalPage" @click="$emit('getPageNo',totalPage)">{{totalPage}}</button>
    <button :disabled="pageNo===totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props:['pageNo','pageSize','total','continues'],
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
          // 12
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
</script>

<style lang="less" scoped>
.pagination {
    text-align:center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}

.active{
  background:skyBlue
}
</style>