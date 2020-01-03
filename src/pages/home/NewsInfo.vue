<template>
    <div id="newsInfo-container">
        <h1 class="title">{{newsInfo.title}}</h1>
        <p class="subtitle">
            <span>发表时间: {{newsInfo.add_time | setDateFormat}}</span>
            <span>点击: {{newsInfo.click}}次</span>
        </p>
        <hr>
        <div class="content" v-html="newsInfo.content"></div>

        <Comment :newId="id" />
    </div>
</template>

<script>
    import Network from '../../utils/Network'
    import Comment from '../../components/Comment.vue'

    export default {
        name: "newsInfo",
        components: {
            Comment
        },
        created() {
            this.getNewsInfo();
        },
        data() {
            return {
                // 将 URL 地址中传递过来的 id参数, 挂载带data上
                id: this.$route.params.id,
                // 新闻信息
                newsInfo: {},
            };
        },
        methods: {
            getNewsInfo() {
                Network.get('/api/getnew/' + this.id)
                    .then((response) => {
                        if (response.data.status == 0) {
                            this.newsInfo = response.data.message[0];
                        }
                    })
            },
        }
    };
</script>

<style lang="scss">
    #newsInfo-container {
        padding: 10px 10px;

        .title {
            color: red;
            font-size: 16px;
            text-align: center;
        }

        .subtitle {
            color: #226fd2;
            margin-top: 15px;
            display: flex;
            justify-content: space-between;
        }

        .content {
            img {
                width: 100%;
            }
        }
    }
</style>