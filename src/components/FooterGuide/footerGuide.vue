<template>
  <footer class="footer_guide border-1px">
    <div class="guide_item" @click="goto('/homePage')" :class="{on: isCurrent('/homePage')}">
      <span class="item_icon">
        <i class="iconfont iconshouye1"></i>
      </span>
      <span>首页</span>
    </div>
    <div class="guide_item" @click="goto('/search')" :class="{on: isCurrent('/search')}">
      <span class="item_icon">
        <i class="iconfont iconsousuo"></i>
      </span>
      <span>搜索</span>
    </div>
    <div class="guide_item" @click="goto('/orderPage')" :class="{on: isCurrent('/orderPage')}">
      <span class="item_icon">
        <i class="iconfont icondingdan"></i>
      </span>
      <span>订单</span>
    </div>
    <div class="guide_item" @click="goto('/myCenterPage')" :class="{on: isCurrent('/myCenterPage')}">
      <span class="item_icon">
        <i class="iconfont iconwode"></i>
      </span>
      <span>我的</span>
    </div>
  </footer>
</template>

<script>
    //import someComponent from './someComponent'
    export default {
        name: "",
        data(){
            return {
                msg: "vue"
            }
        },
        component: {
            //someComponent
        },
      methods:{
        goto(path) {
          this.$router.replace(path)
        },
        isCurrent(path) {
          // console.log(this.$route.path)
          return this.$route.path === path
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixins.styl'
  .footer_guide
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 50px
    display flex
    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      margin 5px
      color #999999
      &.on
        color #FFD700
      span
        font-size 12px
        margin-top 2px
        margin-bottom 2px
        .iconfont
          font-size 22px
</style>
