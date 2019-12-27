<template>
    <div id="photoesInfo-container">
        <h1>图片详情页</h1>
    </div>
</template>

<script>
    import Network from '../../utils/Network';

    export default {
        name: "photoesInfo",
        components: {

        },
        created() {
            this.getPhotoInfo();
        },
        data() {
            return {
                imageInfo: {}
            };
        },
        methods: {
            getPhotoInfo() {
                // 获取外界页面传过来的参数
                let id = this.$route.params.id;
                // 请求
                Network.get('' + id)
                .then((response)=>{
                    console.log(response)
                })
            }
        },
    };
</script>

<style lang="scss" scoped>

</style>