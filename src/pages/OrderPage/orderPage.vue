<!--订单-->
<template>
  <div>
    <HeaderTop :title="title"/>
  </div>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/hearderTop.vue'
  export default {
    data:function () {
      return{
        title:'我的订单'
      }
    },
    components:{
      HeaderTop
    }
  }
</script>

<style scoped>

</style>
