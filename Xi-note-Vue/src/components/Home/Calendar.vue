<template>
  <div class="container" :class="{ open: listIsOpen }">
    <!-- 星期表 -->
    <ul class="week" :class="{ openweek: listIsOpen }">
      <li v-for="item in week" :key="item">{{ item }}</li>
    </ul>
    <!-- 蒙版 遮挡非本周日期 -->
    <div class="mask" :class="{ openmask: listIsOpen }">
      <!-- 本月日期表 -->
      <div class="monthList" ref="monthList" :class="{ listopen: listIsOpen }">
        <div class="date-title">
          <button @click="lastMonth()">
            <svg-icon icon-class="icon-left" style="fill: #ccc"></svg-icon>
          </button>
          <span>{{
          curYear + "年" + formatMonth + "月" + formatDate + "日"
          }}</span>
          <button @click="nextMonth()">
            <svg-icon icon-class="icon-right" style="fill: #ccc"></svg-icon>
          </button>
        </div>
        <!-- 每月具体日期内容盒子 -->
        <ul>
          <li v-for="day in monthList" :key="day.id" class="monthList-day" :class="{
            notThisMonth: day.notThisMonth,
            selectDay: day.id === highLight,
          }" @click="!day.notThisMonth && handleSelectDay(day)">
            {{ day.value }}
          </li>
        </ul>
      </div>
    </div>
    <button class="fold-btn" @click="changeListOpen()">
      <svg-icon style="fill: #ccc" :icon-class="listIsOpen ? 'icon-fold' : 'icon-unfold'"></svg-icon>
    </button>
  </div>
</template>

<script>
import SvgIcon from "../SvgIcon.vue";
import { throttle } from '../../utils'
export default {
  name: "Calendar",
  components: { SvgIcon },
  data() {
    return {
      week: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      // 获得当前年月
      curDate: new Date().getDate(),
      curMonth: new Date().getMonth() + 1,
      curYear: new Date().getFullYear(),
      listIsOpen: false,
      highLight: null,
    };
  },
  computed: {
    // 格式化日期 月份
    formatDate() {
      if (this.curDate < 10) {
        return "0" + this.curDate;
      }
      return this.curDate;
    },
    formatMonth() {
      if (this.curMonth < 10) {
        return "0" + this.curMonth;
      }
      return this.curMonth;
    },
    // 日历偏移参数
    delay() {
      let day = new Date(this.curYear, this.curMonth - 1, 1).getDay();
      let delay = day - 1;
      if (day === 0) {
        delay = 6;
      }
      return delay;
    },
    // 返回需要渲染的本月日期表
    monthList() {
      // new Date()最后一个参数是0，表示当月最后一天
      let date = new Date(this.curYear, this.curMonth, 0);
      // 通过当月最后一天的日期号，得到当月有多少天
      let days = date.getDate();
      let list = [];
      // 获取上月最后一天的日期
      let lastDays = new Date(this.curYear, this.curMonth - 1, 0).getDate();
      for (let i = 1; i < 43; i++) {
        // 用上个月的日期填充日历空缺部分
        if (i < this.delay + 1) {
          list.push({
            id: i,
            value: lastDays - this.delay + i,
            notThisMonth: true,
          });
          // 本月日期
        } else if (i < days + this.delay + 1) {
          list.push({
            id: i,
            value: i - this.delay,
            notThisMonth: false,
          });
          // 下月日期填充空缺部分
        } else {
          list.push({
            id: i,
            value: i - days - this.delay,
            notThisMonth: true,
          });
        }
      }
      return list;
    },
    // 日历盒子的位移参数
    boxDisplacement() {
      return Math.ceil(this.highLight / 7);
    },
    // 将年月日储存为一个对象方便监听
    timedata() {
      const { curYear, formatMonth, formatDate } = this;
      return { curYear, formatMonth, formatDate };
    },
    // 今日时间戳
    todayTimestamp() {
      console.log();
    },
  },
  methods: {
    // 改变月份
    nextMonth: throttle(function () {
      if (this.curMonth === 12) {
        this.curMonth = 1;
        this.curYear++;
      } else {
        this.curMonth++;
      }
      this.curDate = 1;
      this.highLight = this.delay + 1;
    }, 500),
    lastMonth: throttle(function () {
      if (this.curMonth === 1) {
        this.curMonth = 12;
        this.curYear--;
      } else {
        this.curMonth--;
      }
      this.curDate = 1;
      this.highLight = this.delay + 1;
    }, 500),
    // 选择日期
    handleSelectDay(day) {
      this.highLight = day.id;
      this.curDate = day.value;
    },
    // 展开收起
    changeListOpen() {
      this.listIsOpen = !this.listIsOpen;
      if (this.listIsOpen === false) {
        this.$refs.monthList.style.top = `-${this.boxDisplacement * 3 + 1.7
          }rem`;
      } else {
        this.$refs.monthList.style.top = "-2rem";
      }
    },
    // 返回本日
    returnToday() {
      this.highLight = this.curDate + this.delay;
      this.$refs.monthList.style.top = `-${this.boxDisplacement * 3 + 1.7}rem`;
    },
    // 更新时间戳
    updateTimestamp() {
      // 将选中的时间戳更新给vuex
      let timestamp =
        new Date(this.curYear, this.curMonth - 1, this.curDate).getTime() /
        1000;
      this.$store.dispatch("updateTimestamp", timestamp);
    },
  },
  watch: {
    timedata() {
      this.updateTimestamp();
    },
  },
  mounted() {
    this.returnToday();
    this.updateTimestamp();
  },
};
</script>

<style lang="less" scoped>
.container {
  .flex-column;
  position: relative;
  max-width: 56rem;
  min-width: 40rem;
  .card(6rem);
  overflow: hidden;
  transition: all 0.6s ease-in-out;
}

.open {
  height: 23rem;
}

.date-title {
  .flex;
  justify-content: space-between;
  position: relative;
  top: 1rem;
  margin-bottom: 3rem;
  width: 20rem;
  font-size: 1rem;
  color: #bbbbbb;
  font-weight: 600;
}

.week {
  position: absolute;
  top: 1rem;
  .flex;
  width: 35rem;
  margin-bottom: 1.5rem;
  font-size: 0.5rem;
  color: #ccc;

  li {
    width: (35rem/7);
    text-align: center;
    line-height: 100%;
  }
}

.openweek {
  top: 3rem;
}

.mask {
  position: relative;
  top: 2rem;
  height: 3.4rem;
  overflow: hidden;
}

.openmask {
  overflow: visible;
}

.monthList {
  position: relative;
  .flex-column;
  width: 35rem;
  transition: all 0.6s ease-in-out;

  .monthList-day {
    margin: 0 (((35rem/7)-3rem)/2);
    width: 3rem;
    height: 3rem;
    border-radius: 50% 50%;
    text-align: center;
    line-height: 3rem;
    font-family: "微软雅黑";
    font-size: 1.5rem;
    font-weight: bolder;
  }

  ul {
    .flex;
    flex-flow: wrap;

    li {
      cursor: pointer;
    }

    li.notThisMonth {
      cursor: default;
    }
  }
}

// 展开后样式
.listOpen {
  top: -1.5rem;
}

.notThisMonth {
  color: #ccc;
}

.selectDay {
  color: #fff;
  background-color: @theme-color;
}

// 按钮公共样式
button {
  .flex;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  background-color: #fff;
  cursor: pointer;
  border-radius: 50% 50%;
}

// 展开收起按钮
.fold-btn {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
}

// hover样式
button:hover,
.monthList-day:hover {
  background-color: @hover-color;
}
</style>