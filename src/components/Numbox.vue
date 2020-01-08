<template>
    <div id="numbox-container">
        <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
            <button class="mui-btn-numbox-minus" type="button">-</button>
            <input class="mui-input-numbox" type="number" value="1" />
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
        data() {
            return {};
        },
        methods: {},
    };
</script>

<style lang="scss" scoped>

</style>