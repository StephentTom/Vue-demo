import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    // (需要设置, 不然刚进app会出现默认不选中home)设置根路由, 根路由重定向为 home路由界面; 如果是根路径, 则就重定向到home
    path: '/', redirect: '/home',
    name: 'root'
  },
  {
    path: '/home',
    name: 'home',
    component: ()=>import('../pages/home/Home.vue')
  },
  {
    path: '/vip',
    name: 'vip',
    component: ()=>import('../pages/vip/Vip.vue')
  },
  {
    path: '/shopping',
    name: 'shopping',
    component: ()=>import('../pages/shopping/Shopping.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: ()=>import('../pages/search/Search.vue')
  },
  {
    path: '/home/news',
    name: 'news',
    component: ()=>import('../pages/home/News.vue')
  },
  {
    path: '/home/news/newsInfo/:id',
    name: 'newsInfo',
    component: ()=>import('../pages/home/NewsInfo.vue')
  },
  {
    path: '/home/photoes',
    name: 'photoes',
    component: ()=>import('../pages/home/Photoes.vue')
  },
  {
    path: '/home/photoes/photoesInfo/:id',
    name: 'photoesInfo',
    component: ()=>import('../pages/home/PhotoesInfo.vue')
  },
  {
    path: '/home/goods',
    name: 'goods',
    component: ()=>import('../pages/home/Goods.vue')
  },
  {
    path: '/home/goods/goodsInfo',
    name: 'goodsInfo',
    component: ()=>import('../pages/home/GoodsInfo.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'mui-active', // 覆盖默认路由高亮的类, 默认类叫: router-link-active
  // linkExactActiveClass: 'mui-active',
  routes
})

export default router
