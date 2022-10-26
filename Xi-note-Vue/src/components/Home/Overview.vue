<template>
  <div class="container">
    <div id="loopChart"></div>
    <div class="title">
      <h2>
        今日待办事项完成 <span class="todo">{{ todoCompleted }}</span> 项，共
        <span class="todo">{{ todoTotal }}</span> 项 <br />
        已打卡 <span class="daily">{{ dailyCompleted }}</span> 项
      </h2>
    </div>
  </div>
</template>

<script>
import { mapGetters, } from "vuex";
export default {
  name: "Overview",
  methods: {
    draw() {
      // 基于准备好的dom，初始化echarts实例
      var loopChart = this.$echarts.init(document.getElementById("loopChart"));
      // 绘制图表
      loopChart.setOption({
        polar: {
          radius: [120, "60%"],
        },
        color: ["#70c3f3", "#70f3f1"],
        angleAxis: {
          max: 1,
          show: false,
          startAngle: 75,
        },
        radiusAxis: {
          type: "category",
          show: false,
          data: ["今日待办事项完成率", "今日打卡完成率"],
        },
        tooltip: {},
        series: {
          type: "bar",
          data: this.rateData,
          barCategoryGap: "0",
          colorBy: "data",
          coordinateSystem: "polar",
          roundCap: true,
          barWidth: 10,
          showBackground: true,
        },
      });
    },
  },
  computed: {
    ...mapGetters({
      todoTotal: "todoTotal",
      todoCompleted: "todoCompleted",
      dailyCompleted: "dailyCompleted",
      dailyTotal: "dailyTotal",
    }),
    // 完成率数组
    rateData() {
      let data = [];
      data.push(
        Math.floor(100 * this.todoCompleted / this.todoTotal) / 100,
        Math.floor(100 * this.dailyCompleted / this.dailyTotal) / 100
      );
      return data;
    },
  },
  watch: {
    rateData() {
      this.$echarts.dispose(loopChart);
      this.draw();
    }
  },
  mounted() {
    if (!loopChart) this.draw();
  },
};
</script>

<style lang="less" scoped>
.container {
  .flex-column;
  justify-content: space-evenly;
  .card(23rem);
}

#loopChart {
  width: 18rem;
  height: 18rem;
}

.title {
  text-align: center;
  height: 3rem;

  h2 {
    .remind-font;

    span {
      font-size: 1.2rem;
    }

    .todo {
      color: #70c3f3;
    }

    .daily {
      color: #70f3f1;
    }
  }
}
</style>