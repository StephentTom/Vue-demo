<template>
    <div id="numbox-container">
        <!-- 由于父组件传值进来的 countMax属性值是异步加载, 会导致在还未得到此属性值时, 就渲染了此组件 导致countMax值为undefined; 利用 watch 来监听 父组件传过来的 countMax值, 不管watch会被触发几次, 但最后一次肯定是一个合法的数值 -->
        <div class="mui-numbox" data-numbox-min='1'>
            <button class="mui-btn-numbox-minus" type="button">-</button>
            <input ref="box" class="mui-input-numbox" type="number" value="1" @change="textChange"/>
            <button class="mui-btn-numbox-plus" type="button">+</button>
        </div>
    </div>
</template>

<script>
    import mui from '../libs/mui/js/mui.min.js';

    export default {
        name: "numbox",
        components: {},
        mounted() {
            // 为munberbox类的div
            mui(".mui-numbox").numbox();
        },
        props: {
            getGoodsCount: Function,
            // 库存的最大值;  定义多个可能的类型
            countMax: [String, Number],

            // countMax: String,  定义单个类型
            // 另一种定义方式
            // countMax0: {
            //     type: [String, Number],
            //     required: true / false, // 非必设置
            //     default: 1 // 非必设置
            // }
        },
        data() {
            return {
                // max: 1
            };
        },
        methods: {
            // 监听input的改变
            textChange() {
                // 通知父组件
                this.$emit('getGoodsCount', parseInt(this.$refs.box.value));
            }
        },
        // 动态监听属性值改变
        watch: {
            // ES5写法函数
            // countMax: function(newValue, oldValue) {
            //     mui('.mui-numbox').numbox().setOption('max', newValue);
            // }

            // ES6箭头函数
            countMax: (newValue, oldValue)=>{
                // 设置最大值 mui中JS API
                mui('.mui-numbox').numbox().setOption('max', newValue);
            }

            // countMax: function(newValue, oldValue) {
            //     this.max = newValue;
            // }
        }
    };
</script>

<style lang="scss" scoped>

</style>