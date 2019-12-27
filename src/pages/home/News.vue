<template>
  <div id="news-container">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in news" :key="item.id">
        <router-link :to="'/home/news/newsInfo/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>
            <p class='mui-ellipsis'>
              <span>发表时间: {{item.add_time | setDateFormat}}</span>
              <span>点击: {{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import Network from '../../utils/Network';

  export default {
    name: "news",
    components: {

    },
    created() {
      this.getNews();
    },
    data() {
      return {
        // 新闻列表数组
        news: []
      };
    },
    methods: {
      getNews() {
        Network.get('/api/getnewslist')
          .then((response) => {
            if (response.data.status == 0) {
              this.news = response.data.message;
            } else {
              console.log('获取新闻列表失败');
            }
          })
      }
    },
  };
</script>

<style lang="scss" scoped>
  .mui-table-view {
    li {
      h1 {
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .mui-ellipsis {
        font-size: 12px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
</style>