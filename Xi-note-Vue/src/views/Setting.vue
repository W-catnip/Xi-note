<template>

  <div class="container">
    <div class="profile-mana" :class="{ showChange: showChange }">
      <!-- 头像展示框 -->
      <div class="profile-box">
        <h2>我的头像</h2>
        <div class="img size" @mouseover="isShow = true" @mouseout="isShow = false" @click="showUpload()">
          <img ref="img" alt="" width="240" height="240" src="../assets/profile.png">
          <div v-show="isShow" class="size">
            <svg-icon iconClass="icon-profile"></svg-icon>
            <span>更换头像</span>
          </div>
        </div>

      </div>
      <Profile v-show="showChange" ref="profile" @increase-width="increaseWidth"></Profile>
    </div>
    <!-- 个人资料展示框 -->
    <div class="box">
      <h2>个人资料</h2>
      <ol class="info">

        <li>
          <div><span class="label">用户名： </span><span class="content">{{ userInfo.username }}</span></div>
        </li>
        <li>
          <div class="nick"><span class="label">昵&nbsp;&nbsp;&nbsp;&nbsp;称： </span>
            <span v-if="!nickChange" class="content">{{ userInfo.nickname }}</span>
            <input ref="nickChange" type="text" class='nick-change' v-model="nickname" v-if="nickChange">
          </div>
          <span class="change" @click="changeNick()" v-if="!nickChange">更改昵称</span>
          <p v-if="nickChange"><span @click="nickChange = false" class="change">取消</span>
            <span @click="uploadNick" class="change">确定</span>
          </p>
        </li>
        <li>
          <div><span class="label">密&nbsp;&nbsp;&nbsp;&nbsp;码</span></div>
          <span class="change" @click="changeUpdate(true)">更改密码</span>
        </li>
      </ol>
      <button @click="logout()">退出登录</button>
    </div>
    <div class="mask-box" v-if="showChange"></div>
    <!-- 更改密码弹窗 -->
    <Update v-if="isUpdate" @changeUp="changeUpdate()">

    </Update>
  </div>
</template>

<script>
import Profile from '@/components/Setting/Profile.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import { mapActions, mapState } from 'vuex';
import Update from '../components/Setting/Update.vue';
export default {
  name: "Setting",
  components: { Profile, SvgIcon, Update },
  data() {
    return {
      isShow: false,
      showChange: false,
      isUpdate: false,
      nickChange: false,
      nickname: null
    }
  },
  computed: {
    ...mapState(['profile', 'userInfo']),
  },
  methods: {
    ...mapActions(['updateNick']),
    // 显示头像剪裁框
    increaseWidth(para) {
      this.showChange = para;
    },
    showUpload() {
      if (!this.showChange) {
        // 触发子组件的上传按钮
        this.$refs.profile.$refs.imgReader.click();
      }
    },
    // 注销
    logout() {
      // 清除token与id
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('id');
      this.$router.push({ name: 'login' })
    },
    // 是否弹窗
    changeUpdate(bool) {
      this.isUpdate = bool;
    },
    // 弹出更改昵称框
    changeNick() {
      this.nickname = this.userInfo.nickname;
      this.nickChange = true;
      this.$nextTick(() => {
        this.$refs.nickChange.focus()
      })
    },
    // 发送更改昵称请求
    uploadNick() {
      let remarkNick = /^[\u4e00-\u9fa5_a-zA-Z0-9_]{2,8}$/
      if (!remarkNick.test(this.nickname)) {
        this.$message.info('昵称限2-8个字符，支持汉字、字母、数字及下划线')
        return;
      }
      const id = window.localStorage.getItem('id')
      const data = {
        id,
        nickname: this.nickname
      }
      this.$nextTick(() => {
        this.updateNick(data);
      })
      this.nickChange = false;
    }
  },
  watch: {
    profile(newVal) {
      this.$refs.img.src = newVal
    }
  },
  mounted() {
    if (this.profile) { this.$refs.img.src = this.profile }
  }
}
</script>

<style lang="less" scoped>
.mask-box {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 8;
  background-color: #2d2d2d39;
}

.container {
  box-sizing: border-box;
  .flex;
  margin: 2rem;
}

.profile-mana {
  box-sizing: border-box;
  .flex;
  align-items: flex-start;
  justify-content: center;
  .card(25rem);
  min-width: 20rem;
  transition: all .3s ease-in-out;
  z-index: 10;
}

.showChange {
  min-width: 50rem;
}

// 头像框
.profile-box {
  margin-top: 2rem;
  box-sizing: border-box;
  .flex-column;
  justify-content: flex-start;
  padding: 0 2rem;
  max-height: 20rem;

  h2 {
    .h3-font();
    margin-bottom: 2rem;
  }

  // 头像框大小
  .size {
    height: 15rem;
    width: 15rem;
    border-radius: 50%;
  }

  // 头像图片
  .img {
    border: 1px solid #ccc;
    box-shadow: 3px 3px 10px #ccc;
    .flex;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;

    div {
      position: absolute;
      text-align: center;
      line-height: 15rem;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.241);
    }
  }
}

.box {
  box-sizing: border-box;
  .card(25rem);
  padding: 2rem;
  margin-left: 2rem;
  flex-grow: 1;
  min-width: 40rem;

  h2 {
    .h3-font;
  }

}

// 用户信息展示框
.info {
  padding: 1rem 0;
  height: 100%;
  .flex-column;
  justify-content: space-around;

  li {
    .flex;
    justify-content: space-between;
    width: 100%;
    height: 4.5rem;
    border-bottom: 1px solid #ccc;
    padding: 0 1rem;
  }

  li:hover {
    background: linear-gradient(to right, #0000000a, #fff)
  }
}

//按钮 
button {
  margin-top: 1rem;
  float: right;
  background-color: rgb(243, 92, 92);
}

li:first-child {
  border-top: 1px solid #ccc;
}

// 字体
.label {
  .h3-font(1rem)
}

.content {
  .h3-font(1rem);
  font-weight: 400;
}

.change {
  .remind-font(1rem);
  margin-left: 1rem;
  cursor: pointer;
  transition: all .2s ease-in-out;
}

.change:hover {
  color: black;
}

// 昵称更改提示框

.nick-change {
  border: none;
  font-size: 1rem;
  background-color: transparent;
}

.nick-change:focus {
  color: #a8a8a8;
}

.nick-change:focus:placeholder {
  opacity: 0;
}
</style>