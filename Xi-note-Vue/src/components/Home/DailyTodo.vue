<template>
  <div class="container">
    <div class="header">
      <h3>每日打卡</h3>
      <button @click="popUp()">新增打卡</button>
    </div>
    <Newtodo :isPop.sync="isPop" :type="type">
      <div slot="title" class="title">新增打卡</div>
    </Newtodo>
    <TodoContent kind="daily"></TodoContent>
    <div v-if="!dailyTodo.length" class="default">
      <svg-icon iconClass="icon-daily-default" class="icon-default"></svg-icon>
      <p>当前暂无打卡，点击右上角添加</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Newtodo from "./Newtodo.vue";
import TodoContent from "./TodoContent.vue";
export default {
  name: "DailyTodo",
  components: { Newtodo, TodoContent },
  data() {
    return {
      type: "addDailyTodo",
      isPop: false,
    };
  },
  methods: {
    popUp() {
      this.isPop = !this.isPop;
    },
  },
  computed: {
    ...mapState({
      dailyTodo: "dailyTodo",
    }),
  },
};
</script>

<style lang="less" scoped>
.container {
  position: relative;
  width: 22rem;
  .card(25rem);
}

.header {
  box-sizing: border-box;
  .flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  h3 {
    .h3-font;
  }
}

.default {
  position: absolute;
  width: 100%;
  text-align: center;
  top: 50%;
  p {
    position: relative;
    .remind-font();
    bottom: -5rem;
  }
}

.icon-default {
  scale: 10;
}
</style>