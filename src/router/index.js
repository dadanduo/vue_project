import Vue from 'vue'
import Router from 'vue-router'
import demo from '@/components/demo'
import homePage from '@/pages/HomePage/homePage'
import loginPage from '@/pages/LoginPage/loginPage'
import registerPage from '@/pages/RegisterPage/registerPage'
import MyCenterPage from '@/pages/MyCenterPage/myCenterPage'
import Search from '@/pages/Search/search'
import orderPage from '@/pages/OrderPage/orderPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/demo',
      name: 'HelloWorld',
      component:demo
    },
    {
      path:'/homePage',
      name:'homePage',
      component:homePage,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/loginPage',
      name:'loginPage',
      component:loginPage,
    },
    {
      path:'/registerPage',
      name:'registerPage',
      component:registerPage
    },{
      path:'/search',
      name:'Search',
      component:Search,
      meta:{
        showFooter:true
      }
    },{
      path:'/myCenterPage',
      name:'MyCenterPage',
      component:MyCenterPage,
      meta:{
        showFooter:true
      }
    },{
      path:'/orderPage',
      name:'OrderPage',
      component:orderPage,
      meta:{
        showFooter:true
      }
    }
  ]
})
