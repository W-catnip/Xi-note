<!-- 提示消息弹窗组件 -->
<template>
  <transition name="message-fade">
    <div :class="[
      'message',
      'message-' + type,
    ]" :style="{top:offset+ 'px'}" v-if="!closed">
      <p class="message-content">{{message}}</p>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Message',
  data() {
    return {
      message: '默认信息',
      type: 'success',
      offset: 20,
      closed: false,
      duration: 1000,
      timer: null,
      onClose: null
    }
  },
  methods: {
    // 关闭弹窗
    close() {
      this.closed = true;
      if (typeof this.onClose == 'function') {
        this.onClose();
      }
    }
  },
  mounted() {
    this.timer = setTimeout(() => {
      if (!this.closed) {
        this.close();
      }
    }, this.duration)
  }
}
</script>

<style lang="less" scoped>
.message {
  min-width: 380px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 10px;
  border-width: 1px;
  border-style: solid;
  border-color: #EBEEF5;
  position: fixed;
  left: 50%;
  top: 20px;
  z-index: 999999999;
  transform: translateX(-50%);
  background-color: #edf2fc;
  transition: opacity .3s, transform .4s, top .4s;
  overflow: hidden;
  padding: 15px 15px 15px 20px;
  .flex;
  justify-content: center;
}

.message p {
  margin: 0
}

.message-info .message-content {
  color: #909399
}

.message-success {
  background-color: #f0f9eb;
  border-color: #e1f3d8
}

.message-success .message-content {
  color: #67C23A
}

.message-warning {
  background-color: #fdf6ec;
  border-color: #faecd8
}

.message-warning .message-content {
  color: #E6A23C
}

.message-error {
  background-color: #fef0f0;
  border-color: #fde2e2
}

.message-error .message-content {
  color: #F56C6C
}

.message-content {
  padding: 0;
  font-size: 14px;
  line-height: 1
}

.message-content:focus {
  outline-width: 0
}

.message-fade-enter,
.message-fade-leave-active {
  opacity: 0;
  transform: translate(-50%, -100%)
}
</style>