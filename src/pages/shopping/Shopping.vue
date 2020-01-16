<template>
  <div id="shopping-container">

    <div class="good-list">
      <div class="mui-card" v-for="(item, i) in goodList" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner list">

            <van-checkbox v-model="$store.getters.getGoodsSelState[item.id]" @click="checkboxAction(item.id, $store.getters.getGoodsSelState[item.id])" style="width: 28px;"></van-checkbox>

            <van-image width="60" height="60" :src="item.thumb_path" lazy-load fit="contain" />

            <div class="info">
              <h4>{{item.title}}</h4>
              <p class="info-bottom">
                <span class="price">¥{{item.sell_price}}</span>
                <!-- 根据store中的商品 设置其对应商品的count; 已 id为key count为值, 生成一个对象 -->
                <numbox :count="$store.getters.getGoodsCount[item.id]" :id="item.id"></numbox>
                <a href="#" @click.prevent="removeGood(item.id, i)">删除</a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="rs-info">
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner result">
            <div class="rs-info-content">
              <p>总计(不含运费)：</p>
              <p>
                已勾选商品<span class="count">{{$store.getters.getCheckedCount}}</span>件,
                总价：<span class="price">¥{{$store.getters.getCheckedPrice}}</span>
              </p>
            </div>
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    Checkbox,
    CheckboxGroup,
    Image
  } from 'vant';
  import numbox from '../../components/shopcar_numbox';
  import Network from '../../utils/Network';

  export default {
    name: "shopping",
    components: {
      [Checkbox.name]: Checkbox,
      [CheckboxGroup.name]: CheckboxGroup,
      [Image.name]: Image,
      numbox
    },
    created() {
      this.getGoodsList();
    },
    mounted() {

    },
    data() {
      return {
        goodList: []
      };
    },
    methods: {
      // 获取购物车中商品列表
      getGoodsList() {
        // 获取Vuex中store下的所有商品, 拼接所有商品id 当参数
        var idArr = [];
        this.$store.state.car.forEach(element => {
          idArr.push(element.id);
        });

        if (idArr.length <= 0) {
          return;
        }

        Network.get('/api/goods/getshopcarlist/' + idArr.join(","))
          .then(rs => {
            if (rs.data.status == 0) {
              this.goodList = rs.data.message;
            }
          })
      },

      // 删除对应id下的商品 i: 商品对应在list中的角标
      removeGood(id, i) {
        // 删除列表对应商品
        this.goodList.splice(i, 1);
        // 删除本地缓存中对应商品
        this.$store.commit('removeFromCar', id);
      },

      // 复选框点击事件
      checkboxAction(id, isSelected) {
        // 修改对应商品id下的store + 本地存储商品的选中状态
        this.$store.commit('updateGoodsSelState', {
          id: id,
          isSelected: isSelected
        });
      }
    },
  };
</script>

<style lang="scss" scoped>
  #shopping-container {
    background-color: #eee;
    overflow: hidden;

    .price,
    .count {
      color: red;
      font-size: 15px;
    }

    .good-list {
      .list {
        display: flex;
        align-items: center;
      }

      .info {
        margin-left: 10px;

        h4 {
          font-size: 13px;
        }

        .info-bottom {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }

    .rs-info {
      .result {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
</style>