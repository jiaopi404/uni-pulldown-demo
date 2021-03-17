<template>
  <view class="comp-rich-popup">
    <comp-popup
      v-if="show"
      ref="compPopup"
      @close="handleClose"
    >
      <view class="rich-container">
        <view class="btn-close" @click="handleClose"> x </view>
        <view>{{ title }}</view>
        <editor
          id="editor"
          class="rich-editor"
          placeholder="请输入..."
          @ready="onEditorReady"
          :read-only="true"
        ></editor>
      </view>
    </comp-popup>
  </view>
</template>

<script>
import CompPopup from '@/components/comp-popup'
export default {
  name: 'comp-rich-popup',
  components: {
    CompPopup
  },
  data () {
    return {
      editorCtx: null,
      title: '这是标题',
      show: false
    }
  },
  methods: {
    onEditorReady () {
      uni.createSelectorQuery().in(this).select('#editor').context((res) => {
        this.editorCtx = res.context
        this.editorCtx.setContents({
          html: '<p>胜多负少的房间啊安居客可接受的家具开发商借款数据卡四大皆空垃圾设计费科技开发拉数据库副科级的说法数据的佳世客安居房就开始加速房间爱上对方就打萨科技加速空间发数据库副书记阿卡发健康发会计师福建烤老鼠的健康理发师积分卡司法局卡四级考试房间爱上加速度急啊科技路富家大室剑荡四方嘉设计费谁看见了激发数据库计费安检加三大反馈了考虑到放假啊的时间ad设计费嘉设计费萨芬加的数据发送睡大觉安居房近段时间看到发空间第三方的空间沙发空间啊分开交电费就</p>'
        })
      }).exec()
    },
    showModal () {
      this.show = true
    },
    handleClose () {
      this.$nextTick(() => {
        this.show = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .rich-container {
    position: relative;
    background-color: pink;
    padding: 20rpx;
    .btn-close {
      position: absolute;
      top: 5rpx;
      right: 5rpx;
    }
  }
  .rich-editor {
    height: 200rpx;
    margin: 5rpx;
    border: 1px solid #333;
  }
</style>
