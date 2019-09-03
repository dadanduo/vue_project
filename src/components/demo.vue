<template>
  <div class="hello">
    <h1>{{msg}}</h1>
    <img :src="imageUrl"/>
    <button @click="test(imageUrl)">点我啊</button>
    <div v-if="Math.random() > 0.5">
      Now you see me
    </div>
    <div v-else>
      Now you don't
    </div>

    <div v-if="type === 'A'">
      A
    </div>
    <div v-else-if="type === 'B'">
      B
    </div>
    <div v-else-if="type === 'C'">
      C
    </div>
    <div v-else>
      Not A/B/C
    </div>
    <div>
      {{userName}}
    </div>
    <div v-if="loginType=='username'">
      <label>Username</label>
      <input placeholder="Enter your username" key="username-input" v-model="userName">
    </div>
    <div v-else>
      <label>Email</label>
      <input placeholder="Enter your email address" key="email-input">
    </div>

    <button @click="startRequst()">开始请求</button>
    <p v-if='homeCardData!==undefined&&homeCardData.steelChangepriceResultVo!==undefined&&homeCardData.steelChangepriceResultVo.count!== undefined'>
      {{homeCardData.steelChangepriceResultVo.count}}
    </p>

    <div id="container" class="mymap"></div>

  </div>

</template>

<!-- 获取地理位置 -->
<script>
  import httpUtil from '../Utils/httpUtil'
  import {getUrl} from  '../Utils/UrlAll.js'
  import {getHomeCard3} from  '../Utils/UrlAll.js'
  import * as Cookies from '../Utils/cookie.js'
  import {DateTime} from '../Utils/DataTime'
  import {location} from '../Utils/MapLocationUtil.js'
  let requestDate

  export default {
    name: 'HelloWorld',
    data () {
      return {
        loginType: 'username',
        userName: "陈达",
        msg: 'come  on  baby!!!!!!',
        type: 'A',
        imageUrl: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1022109268,3759531978&fm=26&gp=0.jpg",
        homeCardData: {},
      }
    },
    created () {
      this.loadmap();     //加载地图和相关组件
      this.startRequst()
      this.getLocation(); // 调用获取地理位置
    },
    methods: {
      loadmap(){
        const map = new AMap.Map('container', {
          zoom: 9
        })
      },
      getLocation() {
//        let _that = this;
        let geolocation = location.initMap("map-container"); //定位
        AMap.event.addListener(geolocation, "complete", result => {
          alert('经度'+result.position.lng+'维度:'+result.position.lat)
//          _that.lat = result.position.lat;
//          _that.lng = result.position.lng;
//          _that.province = result.addressComponent.province;
//          _that.city = result.addressComponent.city;
//          _that.district = result.addressComponent.district;
        });
      },
      test(url){
        alert(url)
      },
      startRequst(){
        let date = new DateTime();
        requestDate = date.getSystemTimer()
        Cookies.set("otoken", 'GHT:8C1A7FD8F8AE404682A685B2D11F1352', null);
        alert(getHomeCard3())
        httpUtil.newSend({
          method: 'post',
          encode: false,
          url: getHomeCard3(),
          isToken: true,
          data: {
            "steelChangepriceQueryDto": {"sortAreaKey": "", "searchDate": requestDate},
            "queryWarehousrCountParame": {"cityName": "上海市"}
          }
        }).then(res=> {
          this.homeCardData = res.data
        })
      }
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
  .mymap{
    width: 300px;
    height: 300px;
  }
</style>
