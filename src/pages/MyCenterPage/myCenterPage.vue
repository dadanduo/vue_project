<!--个人中心-->
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
        title:'个人中心'
      }
    },
    components:{
      HeaderTop
    }
  }
</script>

<style scoped>

</style>
