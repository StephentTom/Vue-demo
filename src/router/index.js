import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    // (需要设置, 不然刚进app会出现默认不选中home)设置根路由, 根路由重定向为 home路由界面; 如果是根路径, 则就重定向到home
    path: '/', 
    redirect: '/home',
    name: 'root'
  },
  {
    path: '/home',
    name: 'home',
    meta: { title: '首页' },
    component: ()=>import('../pages/home/Home.vue')
  },
  {
    path: '/vip',
    name: 'vip',
    meta: { title: '会员' },
    component: ()=>import('../pages/vip/Vip.vue')
  },
  {
    path: '/shopping',
    name: 'shopping',
    meta: { title: '购物车' },
    component: ()=>import('../pages/shopping/Shopping.vue')
  },
  {
    path: '/search',
    name: 'search',
    meta: { title: '搜索' },
    component: ()=>import('../pages/search/Search.vue')
  },
  {
    path: '/home/news',
    name: 'news',
    meta: { title: '新闻资讯' },
    component: ()=>import('../pages/home/News.vue')
  },
  {
    path: '/home/news/newsInfo/:id',
    name: 'newsInfo',
    meta: { title: '新闻资讯详情' },
    component: ()=>import('../pages/home/NewsInfo.vue')
  },
  {
    path: '/home/photoes',
    name: 'photoes',
    meta: { title: '图片分享' },
    component: ()=>import('../pages/home/Photoes.vue')
  },
  {
    path: '/home/photoes/photoesInfo/:id',
    name: 'photoesInfo',
    meta: { title: '图片分享详情' },
    component: ()=>import('../pages/home/PhotoesInfo.vue')
  },
  {
    path: '/home/goods',
    name: 'goods',
    meta: { title: '商品购买' },
    component: ()=>import('../pages/home/Goods.vue')
  },
  {
    path: '/home/goods/goodsInfo/:goodsId',
    name: 'goodsInfo',
    meta: { title: '商品详情' },
    component: ()=>import('../pages/home/GoodsInfo.vue')
  },
  {
    path: '/home/goods/goodsInfo/gooddesc/:goodsId',
    name: 'gooddesc',
    meta: { title: '商品图文介绍' },
    component: ()=>import('../pages/home/GoodsDesc.vue')
  },
  {
    path: '/home/goods/goodsInfo/goodscomment/:goodsId',
    name: 'goodscomment',
    meta: { title: '商品评论' },
    component: ()=>import('../pages/home/GoodsComment.vue')
  },
  {
    path: '/home/contact',
    name: 'contact',
    meta: { title: '联系我们' },
    component: ()=>import('../pages/home/Contact.vue')
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
