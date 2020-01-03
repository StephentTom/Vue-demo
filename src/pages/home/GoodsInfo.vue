<template>
    <div id="goodsInfo-container">
        
    </div>
</template>

<script>
    export default {
        name: "goodsInfo",
        components: {},
        created() {
            console.log(this.$route.params.goodsId)
        },
        data() {
            return {};
        },
        methods: {}
    };
</script>

<style lang="scss" scoped>

</style>