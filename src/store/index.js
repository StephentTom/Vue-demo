import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 组件之间共享数据, 而不必通过 父子组件之间传值; vuex是一个全局的共享数据存储区, 就相当于一个数据的仓库; 
// 在最组件中访问: this.$store.state.xxx
// 不推荐直接在组件中操作 this.$store.state.xxx, 通过 mutations 中某个函数来操作此 xxx, 组件调用 mutations 中的方法: this.$store.commit('方法名', 参数名); 注意: 只支持传一个参数, 参数类型: 任何类型


// 每次刚进入网页, 肯定会调用 main.js;
// 获取本地存储数据;  ||: localStorage.getItem('car')有值则就取, 反之取 []
var car = JSON.parse(localStorage.getItem('cars') || '[]')

export default new Vuex.Store({
  // 相当于组件中的 data(){ }
  state: {
    // 组件调用方式: this.$store.state.xxx
    car: car,
  },
  // 相当于组件中的methods: { }, 专门用来操作 state{} 里面的数据
  mutations: {
    // 组件调用方式: this.$store.commit('方法名', 按需传递唯一的参数)

    // 加入购物车; 会接受 state 作为第一个参数(默认的)
    addToCar(state, goodsInfo) {
      // 判断是否存在此商品, 存在则只需更新count, 否则直接添加push到car

      var flag = false; // 默认car中不存在此商品

      // some(): 用于检测数组中的元素是否满足指定条件。some() 方法会依次执行数组的每个元素：如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。如果没有满足条件的元素，则返回false。
      state.car.some(item => {
        if (item.id == goodsInfo.id) {
          item.count += parseInt(goodsInfo.count);
          flag = true;
          return true;
        }
      });

      if (flag == false) {
        state.car.push(goodsInfo);
      }

      // 已字符串的形式 添加到本地存储
      localStorage.setItem('cars', JSON.stringify(state.car));
    },

    // 购物车 点击 - + 更新本地商品数据
    updateGoodsCount(state, goodsInfo) {
      state.car.some(item=>{
        if (item.id == goodsInfo.id) {
          item.count = goodsInfo.count;
          return true;
        }
      });
      // 已字符串的形式 更新本地存储
      localStorage.setItem('cars', JSON.stringify(state.car));
    },

    // 删除对应id下的商品
    removeFromCar(state, id) {
      state.car.some((item, i)=>{
        if (item.id == id) {
          state.car.splice(i, 1);
          return true;
        }
      })
      // 更新本地数据
      localStorage.setItem('cars', JSON.stringify(state.car));
    },

    // 更新对应id下商品的选中状态
    updateGoodsSelState(state, goodsInfo) {
      // 获取对应id的商品
      state.car.some(item=>{
        if (item.id == goodsInfo.id) {
          item.isSelected = !goodsInfo.isSelected;
          return true;
        }
      })
      // 更新本地
      localStorage.setItem('cars', JSON.stringify(state.car));
    }
  },
  actions: {},
  modules: {},
  // 如果 $store中的 state 上的数据, 对外需要提供一层包装, 那么推荐使用getters, 访问getters: this.$store.getters.xxx   
  // 只负责对外提供数据, 不负责修改数据, 如果想修改state中的数据, 则利用  mutations 去操作; 相当于 计算属性 computed: {}; 也相当于 filters
  getters: {
    // 组件调用方式: this.$store.getters.xxx

    // 设置tabbar上购物车数量
    getAllCount(state) {
      var allCount = 0;
      state.car.forEach(currentItem => {
        allCount += parseInt(currentItem.count);
      })
      
      return allCount;
    },

    // 获取各类商品对应的count, 已id为key, count为值
    getGoodsCount(state) {
      var obj = {};

      state.car.forEach(item => {
        obj[item.id] = item.count;
      });

      return obj;
    },

    // 获取对象商品是否选中, 以id为key, isSelected为值
    getGoodsSelState(state) {
      var obj = {};

      state.car.forEach(item => {
        obj[item.id] = item.isSelected;
      });
      return obj;
    },

    // 获取所有勾选下的商品count总和
    getCheckedCount(state) {
      var total = 0;

      state.car.forEach(item => {
        if (item.isSelected) {
          total += parseInt(item.count);
        }
      });
      return total;
    },
    
    // 获取所有勾选下商品pirce总和
    getCheckedPrice(state) {
      var total = 0;

      state.car.forEach(item => {
        if (item.isSelected) {
          total += (parseInt(item.price) * parseInt(item.count))
        }
      });
      return total;
    },
  }
})