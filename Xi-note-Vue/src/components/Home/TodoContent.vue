<template>
  <div>
    <!-- 待办事项盒子 -->
    <ul class="todo-box" v-if="kind === 'common'">
      <li v-for="item in todoData" :key="item.id" class="content-box" :class="{
        completed: item.is_completed == true,
        delayed: item.timestamp < todayTimestamp,
      }">
        <div class="left">
          <div class="stripe"></div>
          <!-- 左侧完成按钮 -->
          <CheckBox v-if="item.timestamp >= todayTimestamp"
            @changeCompleted="$store.dispatch('changeTodoCompleted', item)" :isCompleted="item.is_completed"></CheckBox>
          <div class="content">{{ item.content }}</div>
        </div>
        <!-- 右侧编辑、删除按钮 -->
        <div class="right" v-if="item.is_completed == false && item.timestamp >= todayTimestamp">
          <span @click="editTodo(item)">
            <svg-icon iconClass="icon-edit" class="icon"></svg-icon>
          </span>
          <span @click="deleteTodo(item.id)">
            <svg-icon iconClass="icon-delete" class="icon"></svg-icon>
          </span>
        </div>
        <!-- 编辑待办事项弹窗 -->
        <Newtodo v-if="selectedItem === item.id" :isPop.sync="isPop" :type="type" :item="item">
          <div slot="title" class="title">编辑待办</div>
        </Newtodo>
      </li>
    </ul>
    <!-- 打卡事项盒子 -->
    <ul class="todo-box" v-if="kind === 'daily'">
      <li v-for="item in existDailyTodo" :key="item.id" class="content-box" :class="{
        completed: item.is_completed == true,
      }">
        <div class="left">
          <div class="stripe"></div>
          <!-- 左侧完成按钮 -->
          <CheckBox @changeCompleted="$store.dispatch('changeDailyCompleted', item.id)"
            :isCompleted="item.is_completed"></CheckBox>
          <div class="content">{{ item.content }}</div>
        </div>
        <!-- 右侧编辑、删除按钮 -->
        <div class="right" v-if="item.is_completed == false">
          <span @click="editTodo(item)">
            <svg-icon iconClass="icon-edit" class="icon"></svg-icon>
          </span>
          <span @click="deleteTodo(item.id)">
            <svg-icon iconClass="icon-delete" class="icon"></svg-icon>
          </span>
        </div>
        <!-- 编辑待办事项弹窗 -->
        <Newtodo v-if="selectedItem === item.id" :isPop.sync="isPop" :type="type" :item="item" :kind="kind">
          <div slot="title" class="title">编辑打卡</div>
        </Newtodo>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import SvgIcon from "../SvgIcon.vue";
import CheckBox from "./CheckBox.vue";
import Newtodo from "./Newtodo.vue";
export default {
  props: ["kind"],
  name: "TodoContent",
  components: { CheckBox, SvgIcon, Newtodo },
  data() {
    return {
      isPop: false,
      type: "editTodo",
      selectedItem: 0,
    };
  },
  computed: {
    ...mapState({
      dailyTodo: "dailyTodo",
      todoData: "todoData",
      todayTimestamp: "todayTimestamp",
    }),
    existDailyTodo() {
      let data = [];
      this.dailyTodo.forEach((item) => {
        if (!item.is_deleted) {
          data.push(item);
        }
      });
      return data;
    },
  },
  methods: {
    editTodo(item) {
      this.isPop = !this.isPop;
      this.selectedItem = item.id;
    },
    deleteTodo(id) {
      if (this.kind === "common") {
        this.$store.dispatch("deleteTodoData", id);
      } else {
        this.$store.dispatch("deleteDaily", id);
      }
    },
  },
  mounted() {
    this.$store.dispatch("getDaily");
  },
};
</script>

<style lang="less" scoped>
.todo-box {
  padding: 0 1rem 0 1rem;
}

.content-box {
  padding: 1.5rem 0;
  .flex;
  justify-content: space-between;

  .left {
    .flex;
  }

  .stripe {
    height: 2rem;
    width: 0.3rem;
    border-radius: 0.3rem;
    background-color: @theme-color;
  }

  .content {
    font-family: "微软雅黑";
    font-size: 1.2rem;
    margin-left: 1rem;
    font-weight: 600;
  }
}

.content-box:hover {
  background-color: #cccccc23;

  .right {
    display: block;
  }
}

.completed {
  opacity: 0.6;
}

.right {
  display: none;

  span {
    cursor: pointer;
    margin: 0 0.5rem;
  }

  .icon {
    transition: all 0.3s ease-out;
    fill: @theme-color;
  }

  .icon:hover {
    transform: scale(1.3);
    fill: #5b86e2;
  }
}
</style>