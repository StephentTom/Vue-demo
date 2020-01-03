<template>
    <div id="nav-container">
        <mt-header fixed :title="title"></mt-header>
    </div>
</template>

<script>
    export default {
        name: "navBar",
        components: {},
        props: {
            title: String,
        },
        data() {
            return {};
        },
        methods: {},
    };
</script>

<style lang="scss" scoped>
    .mint-header.is-fixed {
        z-index: 99;
    }
</style>