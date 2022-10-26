<template>
  <div class="mask">
    <div class="box">
      <div class="title">
        更改密码
      </div>
      <div class="input">
        <div><span>原 密 码：</span><input type="password" v-model="pwdData.oldPwd"></div>
        <div><span>新 密 码：</span><input type="password" v-model="pwdData.newPwd"></div>
        <div><span>确认密码：</span><input type="password" v-model="pwdData.confirmPwd"></div>
      </div>
      <slot name="input"></slot>
      <div class="btn-box"><button @click="cancel()">取消</button><button @click="confirm()">确定</button></div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'Update',
  data() {
    return {
      pwdData: {
        oldPwd: null,
        newPwd: null,
        confirmPwd: null
      }
    }
  },
  methods: {
    ...mapActions(['updatePwd']),
    cancel() {
      this.$emit('changeUp', false);
    },
    confirm() {
      let id = window.localStorage.getItem('id')
      let data = {
        id,
        oldPwd: this.pwdData.oldPwd,
        newPwd: this.pwdData.newPwd
      }
      this.updatePwd(data)
      this.cancel();
    }
  },
}
</script>

<style lang="less" scoped>
// 大盒子样式
.mask {
  transition: all 0.6s;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: #2d2d2d39;
  .flex-column;
  justify-content: center;

  .box {
    box-sizing: border-box;
    padding: 2rem;
    width: 20rem;
    .card(15rem);
    .flex-column;
    justify-content: space-between;
    box-shadow: 3px 3px 10px #777;


    .title {
      .h3-font(1rem);
    }

  }
}

// 输入盒子样式
.input {
  width: 100%;
}

.input div:first-child {
  margin-top: 1rem;
}

.input div {
  .flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  span {
    font-size: .8rem;
  }

  ;

  input {
    width: 11.4rem;
  }
}

// 按钮设置
.btn-box {
  padding: 0 2rem;
  width: 100%;
  .flex;
  justify-content: space-between;
}

button {
  width: 4rem;
}
</style>