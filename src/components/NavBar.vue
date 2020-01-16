<template>
    <div id="nav-container">
        <mt-header fixed :title="title">
            <span slot="left" @click="goback" v-show="isshowBack">
                <mt-button icon="back">返回</mt-button>
            </span>
        </mt-header>
    </div>
</template>

<script>
    export default {
        name: "navBar",
        components: {},
        props: {
            title: String,
            isshowBack: [Boolean, String]
        },
        created() {
            
        },
        data() {
            return {
                
            };
        },
        methods: {
            // 导航栏点击返回
            goback() {
                this.$router.go(-1);
             }
        },
    };
</script>

<style lang="scss" scoped>
    .mint-header.is-fixed {
        z-index: 99;
    }
</style>