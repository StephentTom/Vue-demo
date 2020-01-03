<template>
 <div id="comment-container">
     <h4>发表评论</h4>
     <hr>
     <textarea class="form-control" type="text" placeholder="请输入评论(最多120字)" maxlength="120" v-model="commentText"></textarea>
     
     <van-button type="info" size="large" class="form-group" @click="sendComment">发表评论</van-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, index) in comments" :key="index">
        <div class="cmt-title">
          第{{index+1}}楼 &nbsp; &nbsp; 用户: {{item.user_name}} 发表时间: {{item.add_time | setDateFormat('yyyy-MM-dd')}}
        </div>
        <div class="cmt-body">{{item.content}}</div>
      </div>
    </div>

     <van-button type="danger" size="large" plain @click="loadMore">加载更多</van-button>
      
 </div>
</template>

<script>
import '../libs/bootstrap/css/bootstrap.min.css'
import { Button } from 'vant'
import Network from '../utils/Network'

export default {
  name: "comment",
  components: {
    [Button.name]: Button
  },
  created() {
    this.getComments();
  },
  props: {
    // 新闻id
    newId: String
  },
  data() {
    return {
        // 评论
        comments: [],
        // 页数
        page: 1,
        // 评论text
        commentText: ''
    };
  },
  methods: {
    // 获取新闻评论
    getComments() {
      Network.get('/api/getcomments/' + this.newId + "?pageindex=" + this.page)
      .then((response)=>{
        if (response.data.status == 0) { 
          this.comments = this.comments.concat(response.data.message)
        }
      })
    },
    // 加载更多
    loadMore() {
      this.page += 1;
      this.getComments();
    },
    // 发表评论
    sendComment() {
      if (this.commentText.length == 0) {
        return ;
      }
      // 另一种拿 newId 从$route.params中获取; .trim(); 去除字符串的头尾空格
      Network.post('/api/postcomment/' + this.$route.params.id, {
        content: this.commentText.trim()
      })
      .then((response)=>{
        console.log(response)
        if (response.data.status == 0) {
          let comment = {
            user_name: '匿名用户',
            add_time: Date.now(),
            content: this.commentText
          };
          this.comments.unshift(comment);
          this.commentText = '';
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
  #comment-container {
    textarea {
      height: 120px;
    }

    .cmt-list {
    .cmt-item {
        .cmt-title {
          font-size: 13px;
          background-color: #ccc
        }
        .cmt-body {
          padding: 10px 15px 10px;
        }
      }
    }
  }
</style>
