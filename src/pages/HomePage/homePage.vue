<template>
  <div class="home">
    <!--头部标题栏-->
    <HeaderTop :title="title">
      <router-link slot="left" class="header_search" to="/search">
        <span class="searchIcon">
        <i class="iconfont iconsousuo"></i>
        </span>
      </router-link>
      <router-link slot="right" class="header_login" to="/loginPage">
        <span class="header_login_text">登录|注册</span>
      </router-link>
    </HeaderTop>

    <!--轮播图-->
    <div class="home-content-wrapper">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="image in imageUrls">
            <img :src="image">
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <!--<div class="swiper-button-prev"></div>-->
        <!--<div class="swiper-button-next"></div>-->

        <!-- 如果需要滚动条 -->
        <!--<div class="swiper-scrollbar"></div>-->
      </div>
    </div>

    <!--list列表-->
    <!--首页附近商家-->
    <div class="msite_shop_list border-1px">
      <div class="shop_header">
        <span class="shop_header_title">产能采购协议</span>
        <scroller :on-refresh="refresh" :on-infinite="infinite" ref="myscroller" class="scrollerList">　　
          <ul>　　　
            <li v-for="(item,i) in arr" :key="i">　　
              {{item.productName}}　　
            </li>
          </ul>
        </scroller>
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import 'swiper/dist/js/swiper.min.js'
  import HeaderTop from '../../components/HeaderTop/hearderTop.vue'
  import {getHomeCard3} from  '../../Utils/UrlAll.js'
  import {getQueryProductionAgreement} from '../../Utils/UrlAll.js'
  import {DateTime} from '../../Utils/DataTime'
  import * as Cookies from '../../Utils/cookie.js'
  import httpUtil from '../../Utils/httpUtil'
  import VueScroller from 'vue-scroller'
  let requestDate
  import Vue from 'vue'
  Vue.use(VueScroller)


  export default {
    data() {
      return {
        title: '上海市',
        imageUrls: [
          'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2121206715,2955288754&fm=26&gp=0.jpg',
          'http://img2.imgtn.bdimg.com/it/u=3369374146,2273666090&fm=26&gp=0.jpg',
          'http://img3.imgtn.bdimg.com/it/u=304048529,3594887020&fm=26&gp=0.jpg'
        ]
        ,
        homeCardData: {},
        tradeLettersResult: {},
        warehouseCountResult: {},
        steelChangepriceResultVo: {},
        agreementInfos: [],
        arr: [],
        noDate: false,//这是一个判断是否加载的开关
        page: 1,
        pageSize: 10

      }
    },
    mounted () {
      new Swiper('.swiper-container', {
        // 轮播图的方向，也可以是vertical方向
        direction: 'horizontal',
        pagination: {
          el: '.swiper-pagination',
        },
        loop: true,
        // 自动播放时间
        autoplay: true,
        // 播放的速度
        speed: 300,
      })
      this.startRequestQueryProductionAgreement()

    },
    created() {
      this.startRequst()
    },
    methods: {
      startRequst(){
        let date = new DateTime();
        requestDate = date.getSystemTimer()
        Cookies.set("otoken", 'GHT:8C1A7FD8F8AE404682A685B2D11F1352', null);
        httpUtil.newSend({
          method: 'post',
          encode: false,
          url: getHomeCard3(),
          isToken: true,
          data: {
            "steelChangepriceQueryDto": {"sortAreaKey": "", "searchDate": requestDate},
            "queryWarehousrCountParame": {"cityName": this.title}
          }
        }).then(res=> {
          this.homeCardData = res.data
          this.tradeLettersResult = res.data.tradeLettersResult
          this.warehouseCountResult = res.data.warehouseCountResult
          this.steelChangepriceResultVo = res.data.steelChangepriceResultVo

        })
      },
      startRequestQueryProductionAgreement(){
        Cookies.set('otoken', 'GHT:8C1A7FD8F8AE404682A685B2D11F1352')
        httpUtil.newSend({
          method: 'post',
          encode: false,
          url: getQueryProductionAgreement(),
          isToken: true,
          data: {
            "agreementCode": "",
            "agreementStatusl": ["04", "05", "08", "081", "082", "10", "15", "30", "80"],
            "endDateTime": "2019-08-30",
            "pageNum": this.page, "pageSize": this.pageSize,
            "providerName": "",
            "startDateTime": "2018-08-30"
          }
        }).then(res=> {
          //这一步是判断你当前请求的这一页数据是不是最后一页，ue如果是最后一页就不能请求了（这个根据后端给的接口判断，只要能判断出就行了，如果是最后一页给that.noDate=true）
          this.noDate = res.data.hasMore == 1 ? false : true
          // 判断是下拉刷新还是上拉加载（这一步也是比较巧妙的，当然也很好理解）
          if (this.page == 1) {
            this.arr = res.data.agreementInfos
          } else {
            this.arr = this.arr.concat(res.data.agreementInfos)
          }
        })
      },
      // 下拉刷新
      refresh(){
        this.page = 1;//重置页数刷新每次页数都是第一页
        this.noDate = false;//重置数据判断
        setTimeout(function () {
          this.startRequestQueryProductionAgreement();
          this.$refs.myscroller.finishPullToRefresh();//刷新完毕关闭刷新的转圈圈
        }.bind(this), 1700)
      },
      // 上拉加载
      infinite(done){
        if (this.noDate) {
          console.log("》》》》没有加载  这个方法是不让它加载了，显示“没有更多数据”，要不然会一直转圈圈")
          this.$refs.myscroller.finishInfinite(true);//这个方法是不让它加载了，显示“没有更多数据”，要不然会一直转圈圈
        } else {
          setTimeout(() => {
            this.page++;//下拉一次页数+1
            console.log("页面"+this.page)
            this.startRequestQueryProductionAgreement();
            done();//进行下一次加载操作
          }, 1500)
        }
      },
    },
    components: {
      HeaderTop,
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixins.styl'
  .home
    width 100%
    height: 100%
    .searchIcon
      width 20px
      height: 20px
      color white
    .home-content-wrapper
      position fixed
      top: 45px
      bottom: 46px
      width: 100%
    .swiper-container
      width: 100%
      height: 175px
      .swiper-wrapper
        height: 100%
        .swiper-slide
          text-align: center
          background: #fff
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      position fixed
      top: 220px
      bottom 46px
      width 100%
      .shop_header
        padding 10px 10px 0 10px
      .shop_icon
        margin-left 5px
        color #999
      .shop_header_title
        color #999
        font-size 14px
        line-height 20px
      .scrollerList
        margin-top 50px

</style>

