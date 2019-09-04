<template>
  <div>
    <keep-alive v-if="$route.meta.keepAlive">
      <!--这里是会被缓存的组件-->
      <router-view/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
    <!--这里是不会被缓存的组件-->
    <FooterGuide v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/footerGuide.vue'
  export default {
    components: {
      FooterGuide
    }
  }
</script>

<style  lang="stylus" rel="stylesheet/stylus">
</style>
