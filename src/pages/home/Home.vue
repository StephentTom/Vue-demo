<template>
  <div id="home-container">
    <!-- 轮播图 -->
    <Carousel :carousels="carousels" :isfull= true></Carousel>

    <!-- 六宫格 -->
    <div class="six-group">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/news">
            <img class="six-menu-img" src="../../assets/images/home/home_menu1.png">
            <div class="mui-media-body">新闻资讯</div>
          </router-link>
        </li>

        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/photoes">
            <img class="six-menu-img" src="../../assets/images/home/home_menu2.png">
            <div class="mui-media-body">图片分享</div>
          </router-link>
        </li>

        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/goods">
            <img class="six-menu-img" src="../../assets/images/home/home_menu3.png">
            <div class="mui-media-body">商品购买</div>
          </router-link>
        </li>

        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img class="six-menu-img" src="../../assets/images/home/home_menu4.png">
            <div class="mui-media-body">留言反馈</div>
          </a>
        </li>

        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img class="six-menu-img" src="../../assets/images/home/home_menu5.png">
            <div class="mui-media-body">视频专区</div>
          </a>
        </li>

        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/contact">
            <img class="six-menu-img" src="../../assets/images/home/home_menu6.png">
            <div class="mui-media-body">联系我们</div>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="six-group">
      <ul class="mui-table-view mui-grid-view mui-grid-9">

      </ul>
    </div>

  </div>
</template>

<script>
  import Network from '../../utils/Network';
  import Carousel from '../../components/Carousel';

  export default {
    name: "home",
    components: {
      Carousel
    },
    created() {
      this.getCarousels();
    },
    data() {
      return {
        // 轮播图数组
        carousels: []
      };
    },
    methods: {
      // 获取轮播图
      getCarousels() {
        Network.get('/api/getlunbo').then((response) => {
          if (response.data.status == 0) {
            this.carousels = response.data.message;
          } else {
            console.log('获取轮播图失败');
          }
        })
      }
    },
    computed: {},
    watch: {},
  };
</script>

<style lang="scss" scoped>
  .mui-grid-view.mui-grid-9 {
    background-color: #fff;
    border: none;
  }

  .mui-grid-view.mui-grid-9 .mui-table-view-cell {
    width: 33.33%;
    border: none;
  }

  .six-menu-img {
    width: 60px;
    height: 60px;
  }
</style>