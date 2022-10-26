<template>
  <div class="dataStat-box">
    <ul>
      <li v-for="item in statData" :key="item.title">
        <p>
          <span class="value">{{ item.value }} </span>
          <span class="unit">{{ item.unit }}</span>
        </p>
        <p class="title">{{ item.title }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "DataStat",
  props: ['todayTimestamp'],
  data() {
    return {
      statData: [
        {
          value: 0,
          unit: "项",
          title: "昨日完成待办",
        },
        {
          value: 0,
          unit: "%",
          title: "昨日待办完成率",
        },
        {
          value: 0,
          unit: "%",
          title: "本周期待办完成率",
        },
        {
          value: 0,
          unit: "项",
          title: "每日打卡完成数",
        },
        {
          value: 0,
          unit: "%",
          title: "每日打卡完成率",
        },
      ],
    };
  },
  computed: {
    ...mapState(["todoStat", "dailyTodo"]),
  },
  // 当组件进行渲染时，vuex由于异步获取数据的操作还未完成，会导致组件获取的vuex.state的值为初始值，从而出现错误,
  // 这时需要对vuex中state的数值进行监听，当其改变后再进行赋值操作。
  watch: {
    todoStat() {
      this.getValue();
    },
    dailyTodo() {
      this.getValue();
    }
  },
  methods: {
    // 获得统计数据
    getValue() {
      // 昨日完成待办数量：
      const yesterdayData = this.todoStat.filter(
        (item) => item.timestamp == this.todayTimestamp - 86400
      );
      const yesterdayCompleted = yesterdayData.filter(
        (item) => item.is_completed
      );
      this.statData[0].value = yesterdayCompleted.length;
      // 昨日待办完成率：
      this.statData[1].value =
        yesterdayData.length == 0 ?
          0 : Math.floor(
            (yesterdayCompleted.length / yesterdayData.length) * 100
          );
      // 本周期待办完成率：
      this.statData[2].value =
        this.todoStat.length == 0 ?
          0 : Math.floor(
            (this.$parent.$children[0].completedTodo.length /
              this.todoStat.length) * 100
          );
      // 每日打卡完成数：
      let count = 0;
      for (let i = 0; i < this.dailyTodo.length; i++) {
        count += this.dailyTodo[i].completed_times;
      }
      this.statData[3].value = count;
      // 每日打卡完成率
      let total = 0;
      for (let i = 0; i < this.dailyTodo.length; i++) {
        total += this.dailyTodo[i].total_times;
      }
      this.statData[4].value = Math.floor((count / total) * 100);
    },
  },
};
</script>

<style lang="less" scoped>
.dataStat-box {
  min-width: 25rem;
  .card(26rem);
  margin: 0 2rem 2rem 0;
  width: 39rem;
}

ul {
  .flex;
  flex-wrap: wrap;
  min-height: 26rem;

  li {
    cursor: default;
    box-sizing: border-box;
    .flex;
    .flex-column;
    justify-content: center;
    width: 33%;
    height: 13rem;

    p {
      margin-bottom: 5px;
    }
  }
}

li:hover {
  background: linear-gradient(to top, #0000000a, #fff);
}

.value {
  .h3-font(3rem);
}

.unit {
  .remind-font(1rem);
}

.title {
  .remind-font();
  color: #8f8f8f;
}
</style>