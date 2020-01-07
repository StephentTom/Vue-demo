<template>
    <div id="goodsInfo-container">
        <!-- 顶部 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <Carousel :carousels="carousels"></Carousel>
                </div>
            </div>
        </div>

        <!-- 中间 -->
        <div class="mui-card">
            <div class="mui-card-header">商品标题</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价: 
                    </p>
                </div>
            </div>
            <div class="mui-card-footer">页脚</div>
        </div>

        <!-- 底部 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>Posted on January 18, 2016</p>
                    <p style="color: #333;">这里显示文章摘要，让读者对文章内容有个粗略的概念...</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <a class="mui-card-link">Like</a>
                <a class="mui-card-link">Read more</a>
            </div>
        </div>

    </div>
</template>

<script>
    import Network from '../../utils/Network';
    import Carousel from '../../components/Carousel';

    export default {
        name: "goodsInfo",
        components: {
            Carousel
        },
        created() {
            this.getCarousels();
        },
        data() {
            return {
                goodsId: this.$route.params.goodsId,
                carousels: []
            };
        },
        methods: {
            // 获取轮播图
            getCarousels() {
                Network.get('/api/getthumimages/' + '87')
                .then((response) => {
                    if (response.data.status == 0) {
                        response.data.message.forEach(currentItem => {
                           currentItem.img = currentItem.src;
                           currentItem.id = currentItem.src;
                        })
                        this.carousels = response.data.message;
                    } else {
                        console.log('获取轮播图失败');
                    }
                })
            }
        }
    };
</script>

<style lang="scss" scoped>
    #goodsInfo-container {
        background-color: #eee;
        overflow: hidden;
    }
</style>