<template>
  <scroll-view class="comp-popup" :scroll-y="true">
<!--    <view class="comp-popup__mask" @click="handleClose"></view>-->
    <view class="content-container">
      <view class="comp-popup__slot-container">
        <slot />
      </view>
    </view>
  </scroll-view>
</template>

<script>
export default {
  name: 'comp-popup',
  data () {
    return {
      ifShow: false
    }
  },
  methods: {
    showPopup () {
      this.ifShow = true
    },
    handleClose () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
  .comp-popup {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, .15);
    z-index: 97;
  }
  .content-container {
    height: calc(100% + 1rpx);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .comp-popup__mask {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, .15);
    z-index: 98;
  }
  .comp-popup__slot-container {
    /*position: fixed;*/
    /*top: 50%;*/
    /*left: 50%;*/
    /*transform: translate(-50%, -50%);*/
    width: 600rpx;
    background-color: #fff;
    /*z-index: 99;*/
  }
</style>
