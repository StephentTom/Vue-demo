<template>
    <div id="goods-container">
        <GoodsItem v-for="item in goods" :key="item.id" :goodItem="item" @goodItemAction="toGoodInfo"></GoodsItem>

        <mt-button class="load-button" type="danger" size="large" @click="loadMore">加载更多</mt-button>
    </div>
</template>

<script>
    import Network from '../../utils/Network'
    import GoodsItem from '../../components/GoodsItem'

    export default {
        name: "goods",
        components: {
            GoodsItem
        },
        created() {
            this.getGoods();
        },
        data() {
            return {
                page: 1,
                goods: []
            };
        },
        methods: {
            getGoods() {
                Network.get('/api/getgoods?pageindex=' + `${this.page}`)
                .then((res)=>{
                    if (res.data.status == 0) {
                        this.goods = this.goods.concat(res.data.message);
                    }
                })
            },

            loadMore() {
                this.page++;
                this.getGoods();
            },

            toGoodInfo(goodsItem) {
                // 在vue实例中, 区分$router 与 $route;  $route: 路由参数对象, 关于路由中的参数(params, query)都属于此对想中;  $router: 是一个路由导航对象, 用它可以使用JS代码, 实现路由的push, pop, 跳转到新的 url地址(新界面)
                this.$router.push({
                    name: 'goodsInfo',
                    // 注意: 这里的 goodsId 参数需要与注册路由js文件中 注册跳转界面的path中所传递的参数名一致;
                    // path: '/home/goods/goodsInfo/:goodsId'
                    params: { goodsId: goodsItem.id }
                })
            }
        },
    };
</script>

<style lang="scss" scoped>
    #goods-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 10px 10px;

        .load-button {
            margin-top: 20px;
        }
    }
</style>