<template>
  <div>
    <router-view/>
    <FooterGuide v-show="$route.meta.showFooter" ></FooterGuide>
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
