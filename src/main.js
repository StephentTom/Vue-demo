import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入 mint-ui 样式
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// 导入 mui 样式
import './libs/mui/css/mui.min.css'
import './libs/mui/css/icons-extra.css'
// 导入图片预览组件
import VuePreview from 'vue-preview'

Vue.config.productionTip = false

// 引入全部组件
Vue.use(MintUI)
Vue.use(VuePreview, {
  mainClass: 'pswp--minimal--dark',
  barsSize: {top: 0, bottom: 0},
  captionEl: false,
  fullscreenEl: false,
  shareEl: false,
  bgOpacity: 0.85,
  tapToClose: true,
  tapToToggleControls: false
})

// 局部引入

// 全局过滤器
Vue.filter('setDateFormat', (dateValue, pattern = 'yyyy-MM-dd HH:mm:ss')=>{
  // 获取对应时间字符串
  var date = new Date(dateValue)
  // 将格式转为小写
  var _pattern = pattern.toLowerCase();
  
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let second = date.getSeconds();

  if (_pattern == 'yyyy-mm-dd hh:mm:ss') {
    return `${year}-${prefixInteger(month, 2)}-${prefixInteger(day, 2)} ${prefixInteger(hour, 2)}:${prefixInteger(minutes, 2)}:${prefixInteger(second, 2)}`;
  }
  if (_pattern == 'yyyy-mm-dd') {
    return `${year}-${prefixInteger(month, 2)}-${prefixInteger(day, 2)}`;
  }
})

// js 数字前面自动补零; value: 值; n: 需要的长度
function prefixInteger(value, n) {
  return (Array(n).join(0) + value).slice(-n);
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
