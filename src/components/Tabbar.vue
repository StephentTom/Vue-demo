<template>
    <div id="tab-container">
        <!-- <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/vip">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopping">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                    <span class="mui-badge" v-if="carCount && carCount != 0? true : false">{{this.carCount}}</span>
                </span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</!-->
        
        <van-tabbar v-model="active" @change="onChange">
            <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
            <van-tabbar-item icon="vip-card-o" to="/vip">会员</van-tabbar-item>
            <van-tabbar-item icon="cart-circle-o" :info="carCount && carCount !=0? carCount : ''" to="/shopping">购物车</van-tabbar-item>
            <van-tabbar-item icon="search" to="/search">搜索</van-tabbar-item>
        </van-tabbar>
    </div>
    
</template>

<script>
    import {Tabbar, TabbarItem, Notify} from 'vant';

    export default {
        name: "tabbar",
        components: {
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem,
            [Notify.name]: Notify
        },
        props: {
            // 购物车数量
            carCount: [String, Number]
        },
        created() {
            
        },
        data() {
            return {
                active: 0,
                // tabbarItems
                tabs: ["首页", "会员", "购物车", "搜索"],
            };
        },
        methods: {
            onChange(index) {
                // this.$emit('tabItemClick', this.tabs[index])
            }
        },
    };
</script>

<style lang="scss" scoped>
    
</style>
