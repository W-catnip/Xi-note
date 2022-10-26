<template>
  <div class="container">
    <div class="header">
      <button @click="popUp()">新建待办</button>
    </div>
    <Newtodo :isPop.sync="isPop" :type="type">
      <div slot="title" class="title">新建待办</div>
    </Newtodo>
    <TodoContent kind="common"></TodoContent>
    <!-- 缺省页 -->
    <div v-if="!todoData.length" class="default">
      <svg-icon iconClass="icon-todo-default" class="icon-default"></svg-icon>
      <p>当前暂无待办，点击右上角添加</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Newtodo from "./Newtodo.vue";
import TodoContent from "./TodoContent.vue";
export default {
  name: "TodoList",
  data() {
    return {
      isPop: false,
      type: "addTodo",
    };
  },
  methods: {
    popUp() {
      this.isPop = !this.isPop;
    },
  },
  computed: {
    ...mapState({
      todoData: "todoData",
    }),
  },
  components: { Newtodo, TodoContent },
};
</script>

<style lang="less" scoped>
.container {
  position: relative;
  min-width: 36.5rem;
  .card(42rem);
}

.header {
  padding: 1rem;
  .flex;
  justify-content: flex-end;
}

.default {
  position: absolute;
  top: 50%;
  left: 50%;
  p {
    position: relative;
    .remind-font(1rem);
    bottom: -7rem;
    left: -50%;
  }
}

.icon-default {
  scale: 20;
}
</style>