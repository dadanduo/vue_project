<!--搜索-->
<template>
  <div>
    <HeaderTop :title="title"/>
  </div>
</template>

<script>
    //import someComponent from './someComponent'
    import HeaderTop from '../../components/HeaderTop/hearderTop.vue'
    export default {
      data:function () {
        return{
          title:'搜索'
        }
      },
      components:{
        HeaderTop
      }
    }
</script>

<style scoped>

</style>
