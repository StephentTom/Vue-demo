<template>
    <div id="shopcar-numbox-container">
        <div class="mui-numbox" data-numbox-min='1' style="height: 28px;">
            <button class="mui-btn-numbox-minus" type="button">-</button>
            <input ref="numbox" class="mui-input-numbox" type="number" :value="count" @change="textChange" readonly style="color: black;"/>
            <button class="mui-btn-numbox-plus" type="button">+</button>
        </div>
    </div>
</template>

<script>
    import mui from '../libs/mui/js/mui.min.js';

    export default {
        name: "shopcar-numbox",
        components: {},
        mounted() {
            // 为munberbox类的div
            mui(".mui-numbox").numbox();
        },
        props: {
            count: [String, Number],
            id: [String, Number]
        },
        data() {
            return {
                
            };
        },
        methods: {
            // 监听input的改变
            textChange() {
                this.$store.commit('updateGoodsCount', {
                    id: this.id,
                    count: this.$refs.numbox.value
                })
            }
        },
    };
</script>

<style lang="scss" scoped>

</style>