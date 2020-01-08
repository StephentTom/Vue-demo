<template>
    <div id="goodscomment-container">
        <commentbox :newId="goodsId"></commentbox>
    </div>
</template>

<script>
    import commentbox from '../../components/Comment';

    export default {
        name: "goodscomment",
        components: {
            commentbox
        },
        data() {
            return {
                goodsId: this.$route.params.goodsId
            };
        },
        methods: {},
    };
</script>

<style lang="scss" scoped>
    #goodscomment-container {
        padding: 10px;
    }
</style>