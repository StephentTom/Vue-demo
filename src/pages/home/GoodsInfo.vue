<template>
    <div id="goodsInfo-container">
        <!-- 顶部 轮播 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <Carousel :carousels="carousels"></Carousel>
                </div>
            </div>
        </div>

        <!-- 中间 -->
        <div class="mui-card">
            <div class="mui-card-header">{{goodInfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <!-- p标签为块级元素 -->
                    <p class="price">
                        <!-- del标签：贯穿删除线; &nbsp; 空格 -->
                        市场价：<del>¥{{goodInfo.market_price}}</del>
                        <label>销售价：<span class="now-price">¥{{goodInfo.sell_price}}</span></label>
                    </p>

                    <div class="buy-count">
                        购买数量：<NumberBox></NumberBox>
                    </div>

                    <div class="buttons">
                        <mt-button type="primary" size="small" @click="quickBuy">立即购买</mt-button>
                        &nbsp;
                        <mt-button type="danger" size="small" @click="addCart">加入购物车</mt-button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 底部 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>

            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodInfo.goods_no}}</p>
                    <p>库存情况：{{goodInfo.stock_quantity}}件</p>
                    <p>上架时间：{{goodInfo.add_time | setDateFormat}}</p>
                </div>
            </div>

            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="introduceAction">图文介绍</mt-button>
                <!-- 如果换行标签 <br> 失效， 获取是因为父元素 使用了flex布局-->
                <br>
                <mt-button type="danger" size="large" plain @click="commentAction">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    import Network from '../../utils/Network';
    import Carousel from '../../components/Carousel';
    import NumberBox from '../../components/Numbox';

    export default {
        name: "goodsInfo",
        components: {
            Carousel,
            NumberBox
        },
        created() {
            this.getCarousels();
            this.getGoodsInfo();
        },
        data() {
            return {
                goodsId: this.$route.params.goodsId,
                carousels: [],
                goodInfo: {}
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
            },

            // 获取商品信息
            getGoodsInfo() {
                Network.get('/api/goods/getinfo/' + this.goodsId)
                .then(rs=>{
                    if (rs.data.status == 0) {
                        this.goodInfo = rs.data.message[0];
                    }
                })
            },

            // 立即购买
            quickBuy() {

            },
            // 加入购物车
            addCart() {
                
            },

            // 图文介绍
            introduceAction() {
                this.$router.push({
                    name: 'gooddesc',
                    params: { goodsId: this.goodsId }
                })
            },
            // 商品评论
            commentAction() {
                this.$router.push({
                    name: 'goodscomment',
                    params: { goodsId: this.goodsId }
                }) 
            }
        }
    };
</script>

<style lang="scss" scoped>
    #goodsInfo-container {
        background-color: #eee;
        overflow: hidden;

        .price {
            color: black;
            label {
                margin-left: 15px;
            }
            .now-price {
                color: red;
            }
        }
        .buy-count {
            display: flex;
            align-items: center;
        }
        .buttons {
            margin-top: 10px;

            .mui-btn-danger {
                margin-left: 10px;
            }
        }
        .mui-card-footer {
            display: block;
        }
    }
</style>