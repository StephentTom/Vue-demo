<template>
    <div id="contact-container">
        Vue常用特性: 1. 表单操作 ×; 2. 自定义指令; 3. 计算属性; 
                    4. 过滤器;   5. 监听器; 6. 生命周期;

        v-model.trim="info" 可去除info中的头尾空格

        自定义指令的语法规则, 'focus'为指令名称;
        例子:
            Vue.directive('focus', {
                inserted: (el)=>{
                    // el: 指令所绑定的元素; 
                    el.focus();
                }
            });
            使用: <input type="text" v-focus>
    </div>
</template>

<script>
    export default {
        name: "contact",
        components: {

        },
        data() {
            return {
 
            };
        },
        created() {

        },
        mounted() {
            
        },
        methods: {},
        computed: {},
        watch: {},
    };
</script>

<style lang="scss" scoped>

</style>