<template>
    <div id="goodsInfo-container">

        <!-- 购物红点; 实现半场动画 -->
        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        >
            <div class="ball" ref="ball" v-show="ballFlag"></div>
        </transition>

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
                        购买数量：<NumberBox :countMax="goodInfo.stock_quantity" @getGoodsCount="selGoodsCount"></NumberBox>
                        <van-icon name="cart-circle-o" info="0"/>
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
    import { Icon } from 'vant';

    export default {
        name: "goodsInfo",
        components: {
            Carousel,
            NumberBox,
            [Icon.name]: Icon
        },
        created() {
            this.getCarousels();
            this.getGoodsInfo();
        },
        data() {
            return {
                goodsId: this.$route.params.goodsId,
                carousels: [],
                goodInfo: {},
                ballFlag: false,
                goodsCount: 1,
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
                this.ballFlag = !this.ballFlag;

                // 利用Vuex存储已加入购物车的商品
                var selGoods = {
                    id: this.goodsId,
                    count: this.goodsCount,
                    price: this.goodInfo.sell_price,
                    isSelected: true
                };
                this.$store.commit('addToCar', selGoods);
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
            },

            // 获取numberBox中的数量
            selGoodsCount(count) {
                this.goodsCount = count;
            },

            // 小红点进入之前动画
            beforeEnter(el) {
                // 摆正红点(由于后面红点位置会发生改变)
                el.style.transform = 'translate(0, 0)';
            },
            // 小红点进入了的动画
            enter(el, done) {
                // 动画关键代码
                el.offsetWidth;
                // 需要什么动画效果过渡
                el.style.transition = 'all 1s cubic-bezier(0.5, -0.5, 1, 1)';
                // 红点位移的终点
                el.style.transform = 'translate(172px, -9px)';
                // done回调函数就是对对应事件enter事件 之后afterenter事件的引用
                done()

                // 问题: 当页面滚动后小球最终位移坐标不准确? 
                // 解决: 小球动画位移不准确问题, 根据不同情况,动态计算最终坐标值!
                // 步骤: 1.先得到最终目标元素的横纵坐标, 再得到小球横纵坐标, 让x, y值求差, 得到获得最终的(x, y)
                // 2. 动态获取 目标 与 小球的位置?  解: 利用 domObject.getBoundingClinetRect() 返回矩形对象, 包含 left, top, right, bottom; 都是相对于屏幕的左上角(0, 0)距离

                // 1. 获取小球在页面中的位置
                // const ballOrigin = this.$refs.ball.getBoundingClientRect();
                // 2. 当一个组件A不属于当前组件B时, 如何拿到此组件A, 利用DOM操作(通过DOM操作可以拿到页面中任何显示出来的组件); 设置target标签的id="", 例如设置成 id="badge"
                // const targetOrigin = document.getElementById('badge').getBoundingClientRect();
                // 3. 获取差值
                // const xDist = targetOrigin.left - ballOrigin.left;
                // const yDist = targetOrigin.top - ballOrigin.top;
                // 4. 设置坐标
                // el.style.transform = `translate(${xDist}px, ${yDist}px)`;

            },
            // 小红点离开之后
            afterEnter(el) {
                this.ballFlag = !this.ballFlag;
            }
        }
    };
</script>

<style lang="scss" scoped>
    #goodsInfo-container {
        background-color: #eee;
        overflow: hidden;
        position: relative;

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
            position: relative;

            .van-icon {
                font-size: 25px;
                position: absolute;
                right: 20px;
            }
            .van-info {
                top: 2px;
            }
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
        .ball {
            z-index: 99;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: red;
            position: absolute;
            top: 350px;
            left: 150px;
        }
    }
</style>