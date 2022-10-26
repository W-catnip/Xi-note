<template>
  <div class="sidebar">
    <div class="logo">
      <h1><img src="../assets/logo.png" alt="!" id="logo" /></h1><span class="title">XI-NOTE</span>
    </div>
    <div class="user">
      <img ref='profileShow' src='../assets/profile.png' /><span>{{userInfo.nickname}}</span>
    </div>
    <router-link v-for="(router, index) in routers" class="nav" :class="{ checked: router.to === selectPath }"
      :key="index" :to="router.to">
      <svg-icon :icon-class="router.iconClass"></svg-icon>
      <span class="nav-name">{{ router.value }}</span>
    </router-link>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: "Sidebar",
  data() {
    return {
      selectPath: "/todo",
    };
  },
  methods: {
    ...mapActions(['getUser']),

    // 头像显示
    showProfile(src) {
      if (!src) {
        img.src = '../assets/profile.png'
      } else {
        const img = this.$refs.profileShow;
        img.src = src;
      }
    }
  },
  computed: {
    ...mapState(['userInfo', 'profile']),
    routers() {
      return this.$store.state.routers;
    },
  },
  watch: {
    $route(to) {
      this.selectPath = to.path;
    },
    profile(newVal) {
      this.showProfile(newVal)
    }
  },
  mounted() {
    this.selectPath = this.$route.path;
    this.getUser(window.localStorage.getItem('id'));
    if (this.profile) {
      this.showProfile(this.profile);
    }
  }
};
</script>

<style lang="less" scoped>
// 公共样式
@width: 15.5rem;

// 侧边栏
.sidebar {
  position: fixed;
  .flex-column;
  width: @width;
  height: 100vh;
  overflow: hidden;
  background-color: rgb(255, 255, 255);
}

// logo框
.logo {
  .flex;
  padding-top: 2.5rem;
  width: 0.8 * @width;
}

.title {
  .h3-font(1.2rem);
}

// 用户框
.user {
  .flex;
  padding-left: .4rem;
  padding-top: 2.5rem;
  padding-bottom: 2rem;
  vertical-align: middle;
  width: 0.8 * @width;

  img {
    margin-right: 1rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    box-shadow: 3px 3px 5px #ccc;
  }

  span {
    .h3-font(1rem);
    color: #aaa;
  }
}

// 选择框
.nav {
  svg {
    margin-left: 1rem;
    margin-right: 1rem;
  }

  width: 0.8 * @width;
  .flex;
  flex-shrink: 0;
  margin-bottom: 1.2rem;
  padding: 0.3rem 0;
  border-radius: 0.6rem;
}

.nav-name {
  font-size: 1rem;
  font-weight: 500;
  color: rgb(38, 37, 37);
  letter-spacing: 2px;
}

.nav:hover {
  background-color: #ccc;
  background-color: @hover-color;
}

.nav.checked {
  background-color: @theme-color;
  color: #fff;

  span {
    color: #fff;
  }
}
</style>