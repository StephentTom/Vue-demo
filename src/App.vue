<template>
  <div id="app-container">
    <!-- 顶部 navigation区域 -->
    <NavBar :title="title" :isshowBack="isshowBack"/>
    <!-- 中间 路由 router-view区域; 设置切换动画 -->
    <transition>
      <router-view />
    </transition>
    <!-- 底部 Tabbar 区域 -->
    <TabBar 
    :carCount="$store.getters.getAllCount"  
    v-show="isshow" />
  </div>
</template>

<script>
  import NavBar from './components/NavBar'
  import TabBar from './components/Tabbar'

  export default {
    name: "app",
    components: {
      NavBar,
      TabBar
    },
    data() {
      return {
        title: '首页',
        // 是否显示tabbar
        isshow: true,
        // 是否显示导航栏返回
        isshowBack: false
      };
    },
    methods: {
    },
    watch: {
      // 监听导航栏左侧返回是否到了第一页, 第一页 不显示返回按钮;
      // 监听是否显示tabber栏;
      "$route.path": function (newVal) {
        if (newVal == '/home' ||
          newVal == '/vip' ||
          newVal == '/shopping' ||
          newVal == '/search') {
          this.isshow = true;
          this.isshowBack = false;
        } else {
          this.isshow = false;
          this.isshowBack = true;
        }

        // 当路由切换时, 设置每个组件的title 自定义路由的其他属性在 meta属性 中设置
        this.title = this.$route.meta.title;
      },
    }
  };
</script>

<style lang="scss" scoped>
  #app-container {
    padding-top: 40px;
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