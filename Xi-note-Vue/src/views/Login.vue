<template>
  <!-- 背景盒子 -->
  <div class="background">
    <!-- 登录注册盒子 -->
    <div class="form-box" ref="form">
      <div class="log-box" v-if="pos == 'left'">
        <h2>登 录</h2>
        <input type="text" placeholder="用户名" v-model="inUserinfo.username">
        <input type="password" placeholder="密码" v-model="inUserinfo.password">
        <button @click="login()">登录</button>
      </div>
      <div class="log-box" v-else>
        <h2>注 册</h2>
        <input type="text" placeholder="昵称" v-model="upUserinfo.nickname">
        <input type="text" placeholder="用户名" v-model="upUserinfo.username">
        <input type="password" placeholder="密码" v-model="upUserinfo.password">
        <input type="password" placeholder="确认密码" v-model="upUserinfo.confirmPass">
        <button @click="logup()">注册</button>
      </div>
    </div>
    <!-- 提示与切换盒子 -->
    <div class="box">
      <div class="remind-box">
        <h2>欢迎来到<span>XI-NOTE</span></h2>
        <h3>快来开启自律的一天</h3>
        <SvgIcon iconClass="icon-login" class="icon"></SvgIcon>
        <p>已有账号?</p>
        <button @click="moveForm()">去登录</button>
      </div>
      <div class="remind-box ">
        <h2>欢迎来到<span>XI-NOTE</span></h2>
        <h3>快来开启自律的一天</h3>
        <SvgIcon iconClass="icon-logup" class="icon"></SvgIcon>
        <p>没有账号?</p>
        <button @click="moveForm()">去注册</button>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon.vue';
import { mapActions } from 'vuex';
import { debounce } from '../utils'
export default {
  name: "Login",
  components: { SvgIcon },
  data() {
    return {
      pos: "left",
      upUserinfo: {
        nickname: '',
        username: '',
        password: '',
        confirmPass: ''
      },
      inUserinfo: {
        username: '',
        password: '',
      }
    };
  },
  methods: {
    ...mapActions(['userLogup', 'userLogin']),
    // 移动登录注册盒
    moveForm() {
      if (this.pos == "left") {
        this.$refs.form.style.translate = "-1rem -50%";
        this.pos = "right";
      }
      else {
        this.$refs.form.style.translate = "-19rem -50%";
        this.pos = "left";
      }
    },
    logup: debounce(function () {
      let { nickname, username, password, confirmPass } = this.upUserinfo;
      // 检验格式是否正确
      let remarkNick = /^[\u4e00-\u9fa5_a-zA-Z0-9_]{2,8}$/
      let remarkUsername = /^[a-zA-Z0-9_\u4e00-\u9fa5]{6,16}$/;
      let remarkPassword = /^[a-zA-Z0-9_-]{8,18}$/
      for (let key of Object.keys(this.upUserinfo)) {
        if (this.upUserinfo[key] == '') {
          this.$message.info('注册信息不得为空')
          return;
        }
      }
      if (!remarkNick.test(nickname)) {
        this.$message.info('昵称限2-8个字符，支持汉字、字母、数字及下划线')
        return;
      }
      if (!remarkUsername.test(username)) {
        this.$message.info('用户名限6-16个字符，支持中英文、数字、下划线')
        return
      }
      if (!remarkPassword.test(password)) {
        this.$message.info('密码限8-18位字符，仅支持字母、数字及下划线以及连接符')
        return
      }
      if (password !== confirmPass) {
        this.$message.info('两次输入的密码不匹配')
        return
      }
      this.userLogup(this.upUserinfo)
    }, 500),

    login: debounce(function () {
      for (let key of Object.keys(this.inUserinfo)) {
        if (this.inUserinfo[key] == '') {
          this.$message.info('登录信息不得为空')
          return;
        }
      }
      this.userLogin(this.inUserinfo)
    }, 500)
  },
}
</script>

<style lang="less" scoped>
.background {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(183, 240, 216, 0.426);
  .flex;
  justify-content: center;

  .box {
    z-index: 1;
    width: 40rem;
    .flex;
    justify-content: center;
    background-color: #fff;
    border-radius: 1rem;
    box-shadow: 7px 7px 8px #ccc;

    // 提示盒样式
    .remind-box {
      .flex-column;
      justify-content: center;
      width: 50%;
      height: 24rem;

      .icon {
        scale: 8;
        margin-bottom: 6rem;
        margin-top: 6rem;
      }

      h2 {
        .title-font(1.5rem);
        padding-bottom: 1rem;
        letter-spacing: 2px;

        span {
          vertical-align: text-bottom;
          font-size: 2rem;
          color: @theme-color;
        }
      }

      h3 {
        .remind-font(1rem)
      }

      p {
        .remind-font(0.6rem);
      }
    }
  }
}

// 登录注册框样式
.form-box {
  z-index: 5;
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -19rem -50%;
  border-radius: 1rem;
  height: 30rem;
  width: 20rem;
  background-color: #afc6f6;
  transition: all 0.5s ease-in-out;
}

.log-box {
  height: 100%;
  .flex-column;
  justify-content: center;

  h2 {
    .title-font;
    color: #fff;
    margin-bottom: 3rem;
  }

  // 输入框样式
  input {
    color: #fff;
    margin-bottom: 2rem;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #ffffff68;
    font-size: 1rem;
    letter-spacing: 2px;
  }

  input::placeholder {
    color: #ffffff65;
  }

  input:focus {
    color: #ffffffa3;
    outline: none;
    border-bottom: 1px solid @theme-color;
    transition: 0.5s;
  }

  input:focus::placeholder {
    opacity: 0;
  }

  button {
    color: @theme-color;
    font-size: 1rem;
    font-weight: 600;
    margin-top: 1rem;
    background-color: #fff;
  }
}
</style>