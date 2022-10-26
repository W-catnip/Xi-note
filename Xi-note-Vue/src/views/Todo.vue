<template>
  <div class="home">
    <div class="left">
      <div class="calendar-box">
        <Calendar></Calendar>
      </div>
      <div class="todolist">
        <TodoList></TodoList>
      </div>
    </div>
    <div class="right">
      <Overview></Overview>
      <div class="dailyTodo">
        <DailyTodo></DailyTodo>
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from "@/components/Home/Calendar.vue";
import TodoList from "@/components/Home/TodoList.vue";
import DailyTodo from "../components/Home/DailyTodo.vue";
import Overview from "@/components/Home/Overview.vue";
export default {
  components: { Calendar, TodoList, DailyTodo, Overview },
};
</script>

<style lang="less" scoped>
.home {
  display: flex;
}

.left {
  margin: 0 0 2rem 2rem;
  width: 100%;
  min-width: 36.5rem;
}

.calendar-box {
  margin-bottom: 2rem;
}

.right {
  margin: 0 2rem 2rem 2rem;
}

.dailyTodo {
  margin-top: 2rem;
}
</style>