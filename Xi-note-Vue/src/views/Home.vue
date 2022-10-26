<template>
  <div class="app">
    <div class="sidebar">
      <Sidebar></Sidebar>
    </div>
    <div class="main">
      <Header></Header>
      <!-- <router-view /> -->
      <keep-alive include="Dashboard">
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import Header from "../components/Header.vue";
export default {
  components: {
    Sidebar,
    Header,
  },
  mounted() {
    if (this.$route.path == '/') {
      this.$router.push('/todo');
    }
  }
};
</script>

<style lang="less" scoped>
.app {
  display: flex;
}

.main {
  box-sizing: border-box;
  margin-left: 15.5rem;
  width: calc(100vw - 15.5rem);
}
</style>
