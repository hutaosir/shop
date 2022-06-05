<template>
  <div>
      <TypeNav/>
      <ListContainer/>
      <Recommend/>
      <Rank/>
      <Like/>
      <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
      <Brand/>

  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import {mapState} from 'vuex'

export default {

    name:'Home',
    components:{ListContainer,Recommend,Rank,Like,Floor,Brand},
    mounted(){
      // 获取floor的数进行页面渲染
      this.$store.dispatch('getFloorList')
      // 获取用户信息
      // this.$store.dispatch('getUserInfo')
    },
    // 让仓库里的数据传到组件中
    computed:{
      ...mapState({
      floorList:state=>state.home.floorList
      })
    }
}
</script>

<style>

</style>