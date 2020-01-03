<template>
    <div id="photoesInfo-container">
        <!-- 头部 -->
        <div class="head">
            <h4>{{this.imageInfo.title}}</h4>
            <div class="desc">
                <span>发布时间: {{this.imageInfo.add_time | setDateFormat("yyyy-MM-dd")}}</span>
                <span>点击: {{this.imageInfo.click}}次</span>
            </div>
        </div>
        <hr>

        <!-- 图片缩略图 -->
        <div class="thumbs">
            <vue-preview :slides="imageThums"></vue-preview>
        </div>
        
        <!-- 图片内容 -->
        <div class="content" v-html="this.imageInfo.content"></div>

        <!-- 评论组件 -->
        <Comment :newId="id" />

    </div>
</template>

<script>
    import Network from '../../utils/Network';
    import Comment from '../../components/Comment.vue';

    export default {
        name: "photoesInfo",
        components: {
            Comment
        },
        created() {
            this.getPhotoInfo();
            this.getThumbs();
        },
        data() {
            return {
                id: this.$route.params.id,
                imageInfo: {},
                imageThums: [], // 缩略图列表
            };
        },
        methods: {
            getPhotoInfo() {
                // 获取外界页面传过来的参数
                let id = this.$route.params.id;
                // 请求
                Network.get('/api/getimageInfo/' + id)
                .then((response) => {
                    if (response.data.status == 0) {
                        this.imageInfo = response.data.message[0];
                    }
                })
            },

            getThumbs() {
                Network.get('/api/getthumimages/' + this.id)
                .then((response)=>{
                    if (response.data.status == 0) {
                        // 为图片手动添加 height, width
                        response.data.message.forEach(element => {
                            element.w = 600;
                            element.h = 400;
                            element.msrc = element.src;
                        });
                        this.imageThums = response.data.message;
                    }
                })
            }
        },
    };
</script>

<style lang="scss" scoped>
    #photoesInfo-container {
        padding: 10px 8px;

        h4 {
            font-size: 16px;
            color: #226fd2;
        }

        .head {
            height: 35px;
            text-align: center;
            .desc {
                color: #999;
                font-size: 13px;
                margin-top: 10px;
                padding: 0 10px;
                display: flex;
                justify-content: space-between;
            }
        }

        .content {
            margin-top: 10px;
            margin-bottom: 15px;
            font-size: 15px;
        }

        .thumbs {
            display: flex;
            flex-wrap: wrap; /* 换行 */
        }
    }
</style>