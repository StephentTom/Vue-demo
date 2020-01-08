<template>
    <div id="gooddesc-container">
        <h4>{{goodDesc.title}}</h4>
        <hr>
        <div class="content" v-html="goodDesc.content"></div>
    </div>
</template>

<script>
    import Network from '../../utils/Network';

    export default {
        name: "gooddesc",
        components: {},
        created() {
            this.getGoodDesc();
        },
        data() {
            return {
                goodsId: this.$route.params.goodsId,
                goodDesc: {}
            };
        },
        methods: {
            getGoodDesc() {
                Network.get('/api/goods/getdesc/' + this.goodsId)
                .then(rs=>{
                    if (rs.data.status === 0) {
                        this.goodDesc = rs.data.message[0];
                    }
                })
            }
        },
    };
</script>

<style lang="scss">
    #gooddesc-container {
        padding: 0 4px;
        h4 {
            color: #226aff;
            font-size: 15px;
            line-height: 30px;
             text-align: center;
        }

        // 处理html中图片不能完全显示, 需要设置html中 img标签 width: 100% + scoped去除
        .content {
            img {
                width: 100%;
            }
        }
    }
</style>