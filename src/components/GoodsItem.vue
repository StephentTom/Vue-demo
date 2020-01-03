<template>
  <div id="goodsItem-container" @click="itemAction">
    <div class="img-container">
      <img :src="this.goodItem.img_url">
    </div>

    <div class="title">{{this.goodItem.title}}</div>

    <div class="bottom-container">
      <div class="price-container">
        <span class="price-now">¥ {{this.goodItem.sell_price}}</span>
        <span class="price-origin">¥ {{this.goodItem.market_price}}</span>
      </div>

      <div class="desc-container">
        <span>热卖</span>
        <span>剩余{{this.goodItem.stock_quantity}}件</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "goodsItem",
    components: {},
    props: {
      goodItem: Object,
      goodItemAction: Function,
    },
    data() {
      return {};
    },
    methods: {
      itemAction() {
        this.$emit("goodItemAction", this.goodItem)
      }
    },
  };
</script>

<style lang="scss" scoped>
  #goodsItem-container {
    text-decoration: none;
    width: 48%;
    border: 0.5px solid #ccc;
    margin-top: 10px;
    min-height: 293px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .img-container {
      margin-top: 10px;
      padding: 0 10px;
      img {
        width: 100%
      }
    }

    .title {
      font-size: 14px;
      padding: 0 5px;
      // 设置文本只显示两行, 超出则省略号提示
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }

    .bottom-container {
      color: #999;
      background-color: #ccc;
      padding: 0 5px;

      .price-container {
        .price-now {
          color: red;
          font-size: 14px;
        }

        .price-origin {
          font-size: 10px;
          text-decoration: line-through;
          margin-left: 20px;
        }
      }

      .desc-container {
        font-size: 10px;
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>