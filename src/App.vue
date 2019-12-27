<template>
  <div id="app-container">
    <!-- 顶部 navigation区域 -->
    <NavBar :title="title"/>
    <!-- 中间 路由 router-view区域; 设置切换动画 -->
    <transition>
      <router-view />
    </transition>
    <!-- 底部 Tabbar 区域 -->
    <TabBar 
      carCount 
      v-on:tabItemClick="reloadTitle"  
      v-if="this.$route.path == '/home' || this.$route.path == '/vip' || this.$route.path == '/shopping' || this.$route.path == '/search'"/>
  </div>
</template>

<script>
  import { NavBar, TabBar } from './components/base'

  export default {
    name: "app",
    components: {
      NavBar,
      TabBar
    },
    data() {
      return {
        title: '首页'
      };
    },
    methods: {
      reloadTitle(title) {
        this.title = title;
      }
    }
  };
</script>

<style lang="scss" scoped>
  #app-container {
    padding-top: 40px;
    padding-bottom: 50px;
    overflow-x: hidden;
  }
  
  .v-enter { 
    opacity: 0;
    // 当前显示的页面左上角为0; 页面进来后,从右->左 
    transform: translateX(100%);
  }
  .v-leave-to {
    opacity: 0;
    // 页面离开后, 从当前页->左移除
    transform: translateX(-100%);
    position: absolute;
  }

  .v-enter-active,
  .v-leave-active {
    transition: all 0.5s ease-in
  }
</style>

