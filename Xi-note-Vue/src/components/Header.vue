<template>
  <div class="header">
    <h2>{{ title }}</h2>
  </div>
</template>

<script>
export default {
  name: "Header",
  computed: {
    title() {
      // 找出现在所选择的路由
      const index = this.$store.state.routers.findIndex(
        (item) => item.to == this.$route.path
      );
      // 返回路由标题
      return this.$store.state.routers[index].value;
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  height: 7rem;
  position: relative;

  h2 {
    position: absolute;
    top: 4rem;
    left: 2.5rem;
    .title-font;
  }
}
</style>