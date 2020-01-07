<template>
    <div id="carousel-container">
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in this.carousels" :key="item.id">
                <!-- full是样式表达式, isfull是定义bool类型, true是才添加 full样式表达式, 反之不加-->
                <img :class="{'full': isfull}" v-lazy='item.img'>
            </mt-swipe-item>
        </mt-swipe>
    </div>

    <!-- 分析轮播图的图片mode:  目前设置的 图片宽高为 100%; 
        有时候图片设置为100%时, 会出现变形;
        解决: 高度 100%, 宽度自适应; 因此把是否 需要设置图片宽度为 100%; 设置一个属性 暴露出去 
    -->
</template>

<script>
    export default {
        name: "carousel",
        components: {},
        props: {
            // 定义个 carousels 的数组
            carousels: Array,
            isfull: Boolean
        },
        data() {
            return {

            };
        },
        methods: {

        }
    };
</script>

<style lang="scss" scoped>
    .mint-swipe {
        height: 200px;

        .mint-swipe-item {
            text-align: center;
            // &:nth-child(1) {
            //     background-color: antiquewhite;
            // }

            // &:nth-child(2) {
            //     background-color: yellowgreen;
            // }

            // &:nth-child(3) {
            //     background-color: violet;
            // }

            img {
                // width: 100%;
                height: 100%;
            }
        }
    }

    .full {
        width: 100%;
    }
</style>