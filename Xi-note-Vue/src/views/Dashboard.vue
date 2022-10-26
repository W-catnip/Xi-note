<template>
  <div class="box">
    <TodoStat :todayTimestamp="todayTimestamp"></TodoStat>
    <div class="bottom">
      <DailyStat class="daily"></DailyStat>
      <DataStat class="data" :todayTimestamp="todayTimestamp"></DataStat>
    </div>
  </div>
</template>

<script>
import TodoStat from "@/components/Dashboard/TodoStat.vue";
import DailyStat from "@/components/Dashboard/DailyStat.vue";
import DataStat from "@/components/Dashboard/DataStat.vue";
export default {
  name: "Dashboard",
  components: { TodoStat, DailyStat, DataStat },
  data() {
    return {
      // 今日时间戳
      todayTimestamp: new Date(new Date().setHours(0, 0, 0, 0)).getTime() / 1000,
    }
  },
};
</script>

<style lang="less" scoped>
.box {
  .flex-column;

  .bottom {
    .flex;
    width: 100%;
  }
}
</style>