<template>
  <div class="todoStat-box">
    <div class="title">
      前七日共设置待办
      <span class="emphasize">{{ todoStat.length }}</span> 项，完成
      <span class="emphasize">{{ completedTodo.length }}</span> 项
    </div>
    <div id="todoChart"></div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "TodoStat",
  props: ['todayTimestamp'],
  methods: {
    // 待办事项折线图渲染函数
    draw() {
      let todoChart = this.$echarts.init(document.getElementById("todoChart"));
      todoChart.setOption({
        xAxis: {
          type: "category",
          data: this.weekDate,
          axisPointer: {
            show: true,
            type: "shadow",
            snap: true,
            shadowStyle: {
              color: "#70c3f320",
            },
            label: {
              show: true,
              color: "#70c3f3",
            },
          },
          axisLine: {
            lineStyle: {
              color: "",
            },
          },
        },
        yAxis: {
          type: "value",
          minInterval: 1,
        },
        textStyle: {
          color: "black",
        },
        series: [
          {
            data: this.weekCompleted,
            type: "line",
            smooth: true,
            showSymbol: false,
            symbolSize: 8,
            lineStyle: {
              width: 4,
            },
          },
        ],
      });
    },
    ...mapActions(["getTodoStat", "getDaily"]),
  },
  computed: {
    ...mapState({
      todoStat: "todoStat",
    }),
    // 前七日完成的待办事项数组
    completedTodo() {
      return this.todoStat.filter((item) => item.is_completed)
    },
    // 前七日每日完成的待办事项
    weekCompleted() {
      let stat = [];
      for (let i = 7; i > 0; i--) {
        let count = 0;
        let time = this.todayTimestamp - i * 86400;
        this.completedTodo.forEach((element) => {
          if (element.timestamp == time) {
            count++;
          }
        });
        stat.push(count);
      }
      return stat;
    },
    // 获得前七日的日期
    weekDate() {
      let week = [];
      for (let i = 7; i > 0; i--) {
        let time = (this.todayTimestamp - i * 86400) * 1000;
        const date = new Date();
        date.setTime(time);
        let m = date.getMonth() + 1;
        let d = date.getDate();
        let day = m + "/" + d;
        week.push(day);
      }
      return week;
    },
  },
  watch: {
    todoStat() {
      this.draw();
    }
  },
  mounted() {
    // 发送获取近七日的待办事项统计数据
    this.getTodoStat(this.todayTimestamp);
    this.getDaily();
  },
};
</script>

<style lang="less" scoped>
.todoStat-box {
  margin: 0 2rem 2rem 2rem;
  .card(30rem);
  width: (100% - 5rem);

  .title {
    .remind-font(1rem);
    padding: 2rem;

    .emphasize {
      .h3-font();
      color: @theme-color;
    }
  }
}

#todoChart {
  box-sizing: border-box;
  width: 100%;
  height: 28rem;
}
</style>