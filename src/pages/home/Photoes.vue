<template>
  <div id="photoes-container">
    <!-- 顶部slider -->
    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="(item, index) in categorys" :key="item.id"
            @click.prevent="handleClick(item.id, index)">
            {{item.title}}
          </a>
        </div>
      </div>
    </div>

    <!-- 图片列表内容 -->
    <ul class="photo-list">
      <router-link :to="'/home/photoes/photoesInfo/' + item.id" tag="li" v-for="item in imgs" :key="item.id">
        <img v-lazy="item.img_url">
        <div class="desc-div">
          <h4>{{item.title}}</h4>
          <p>{{item.zhaiyao}}</p>
        </div>
      </router-link>
    </ul>

  </div>
</template>

<script>
  import Network from '../../utils/Network';
  import mui from '../../libs/mui/js/mui.min.js';

  export default {
    name: "photoes",
    components: {

    },
    created() {
      this.getPhotoesCategory();
      // 默认传0, 获取全部图片数据
      this.getImagesWithCategoryID(0);
    },
    mounted() {
      // 手动配置scroll滚动, 如果不写, 则无法滚动
      mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      });
    },
    data() {
      return {
        categorys: [],
        imgs: [],
        // 记录当前选中的i, 默认选中0
        curi: 0,
      };
    },
    methods: {
      handleClick(categoryID, i) {
        if (i === this.curi) {
          return;
        }
        this.getImagesWithCategoryID(categoryID, i)
      },

      getPhotoesCategory() {
        Network.get('/api/getimgcategory')
          .then((response) => {
            if (response.data.status == 0) {
              // 手动添加一个全部分类
              let allCategory = {
                title: '全部',
                id: 0
              };
              response.data.message.unshift(allCategory)

              this.categorys = response.data.message;
            }
          })
      },

      getImagesWithCategoryID(categoryID, i) {
        Network.get('/api/getimages/' + categoryID)
          .then((response) => {
            if (response.data.status == 0) {
              this.curi = i;
              this.imgs = response.data.message;
            }
          })
      },

    }
  };
</script>

<style lang="scss" scoped>
  // 移除滑动时, 提示的警告; 这个警告是由Chrome为了提高挂东的流畅度, 而产生的
  * {
    // 用于指定某个区域是否允许用户操作, 以及如何响应用户的操作
    touch-action: pan-y;
  }

  a {
     text-decoration: none;
  }

  .photo-list {
    list-style: none; // 去除ul自带的标记黑点
    margin: 0;
    margin: 10px;
    padding-bottom: 0;
    box-shadow: 0 0 5px #888;
    li {
      background-color: #ccc;
      text-align: center;
      margin-bottom: 10px;
      position: relative;
      img {
        width: 100%;
        // 去除图片自身的边框
        display: flex;
      }
      .desc-div {
        position: absolute;
        bottom: 0;
        background-color: transparent;
        text-align: left;
        padding: 0 10px;
        h4 {
          color: #fff;
          font-size: 15px;
        }
        p {
          color: #fff;
          font-size: 13px;
        }
      }
      // 懒加载图片时, 出现的圈圈样式
      img[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
      }
    }
  }
</style>