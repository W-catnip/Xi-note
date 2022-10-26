<template>
  <div class="dailyStat-box">
    <div id="dailyChart"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "DailyStat",
  computed: {
    ...mapState(['dailyTodo']),
    // 未删除的每日打卡
    existDaily() {
      return this.dailyTodo.filter((item) => !item.is_deleted)
    },
    // 打卡内容
    dailyCotent() {
      return this.existDaily.map((item) => item.content)
    },
    // 打卡完成数
    dailyCompleted() {
      return this.existDaily.map((item) => item.completed_times)
    },
    // 打卡总数
    dailyTotal() {
      return this.existDaily.map((item) => item.total_times)
    }
  },
  methods: {
    draw() {
      let dailyChart = this.$echarts.init(
        document.getElementById("dailyChart")
      );
      dailyChart.setOption({
        title: {
          text: '现存每日打卡完成情况',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: "#70c3f320",
            },
          }
        },
        color: ["#70c3f3cc", "#70f3f1cc"],
        legend: {
          left: 'right'
        },
        grid: {
          x: '0%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: this.dailyCotent
        },
        series: [
          {
            name: '打卡完成天数',
            type: 'bar',
            data: this.dailyCompleted
          },
          {
            name: '打卡总天数',
            type: 'bar',
            data: this.dailyTotal
          }
        ]
      });
    },
  },
  watch: {
    dailyTodo() {
      this.draw();
    }
  }
};
</script>

<style lang="less" scoped>
.dailyStat-box {
  box-sizing: border-box;
  .card(26rem);
  width: 39rem;
  margin: 0 2rem 2rem 2rem;
}

#dailyChart {
  box-sizing: border-box;
  padding: 2rem 2rem 0rem 2rem;
  width: 100%;
  height: 26rem;
}
</style>