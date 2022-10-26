<template>
  <!-- 遮罩层 -->
  <div class="mask" v-show="isShow">
    <!-- 弹窗 -->
    <div class="container">
      <div class="header">
        <slot name="title"></slot>
        <div class="btn-box">
          <span class="cancel" @click="cancel()">取消</span>
          <span class="confirm" @click="confirm(item)"> 确定 </span>
        </div>
      </div>
      <!-- 输入框 -->
      <input class="content" type="text" placeholder="想做点什么？" ref="inputdata" v-model="content" />
      <div></div>
    </div>
  </div>
</template>

<script>
import { debounce } from '../../utils'
export default {
  name: "NewTodo",
  props: ["isPop", "type", "item", "selectedItem", "kind"],
  data() {
    return {
      content: null,
    };
  },
  computed: {
    // props传过来的值不能直接更改，可以使用.sync关键字或者v-model进行更改
    isShow: {
      get() {
        return this.isPop;
      },
      set(val) {
        this.$emit("update:isPop", val);
      },
    },
  },
  methods: {
    cancel() {
      this.isShow = false;
      document.body.style.overflow = "visible";
      this.content = null;
    },
    // 确定按钮逻辑处理
    confirm: debounce(function (item) {
      // 格式检查
      const remarkItem = /^[\u4e00-\u9fa5]{2,10}$/
      if (!this.content) {
        this.$message.info('内容不能为空')
        return;
      }
      if (!remarkItem.test(this.content)) {
        this.$message.info('内容仅支持2-10位中文字符')
        return;
      }
      // 编辑每日打卡
      if (this.kind === "daily") {
        let todoData = JSON.parse(JSON.stringify(item));
        todoData.content = this.content;
        this.$store.dispatch("editDaily", todoData);
        this.cancel();
        return;
      }
      // 新增待办事项时：
      if (this.type === "addTodo") {
        let todoData = {
          content: this.content,
          timestamp: this.$store.state.timestamp,
        };
        this.$store.dispatch("addTodoData", todoData);
        // 编辑待办事项时：
      } else if (this.type === "editTodo") {
        let todoData = JSON.parse(JSON.stringify(item));
        todoData.content = this.content;
        this.$store.dispatch("editTodoData", todoData);
        // 新增每日打卡
      } else if (this.type === "addDailyTodo") {
        let todoData = {
          content: this.content,
        };
        this.$store.dispatch("addDaily", todoData);
      }
      this.cancel();
    }, 500)
  },
  // 如果在 DOM 结构中的某个 DOM 节点使用了 v-if、v-show 或者 v-for，那么这些 DOM 是不会在 mounted 阶段找到的。所以在 mounted 钩子中使用 $refs，返回来的只能是 undefined，因为在 mounted 阶段不存在。
  updated() {
    if (this.isShow == true) {
      document.body.style.overflow = "hidden";
    }
    this.$nextTick(() => {
      this.$refs.inputdata.focus();
    });
  },
};
</script>

<style lang="less" scoped>
// 遮罩层样式
.mask {
  transition: all 0.6s;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: #2d2d2d39;
  .flex;
  justify-content: center;

  // 内容框样式
  .container {
    .flex-column;
    justify-content: space-between;
    align-items: flex-start;
    box-sizing: border-box;
    width: 50rem;
    height: 16rem;
    border-radius: 1rem;
    padding: 2rem;
    background-color: #fff;
  }
}

.header {
  width: 100%;
  .flex;
  align-items: flex-start;
  justify-content: space-between;
}

.title {
  .title-font;
}

// 按钮样式
.btn-box {
  .flex;
  justify-content: space-between;
  width: 8rem;

  span {
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: 600;
    opacity: 0.8;
  }

  .cancel {
    color: #cccccc;
  }

  .confirm {
    color: @theme-color;
  }
}

span:hover {
  opacity: 1;
}

// 输入框样式
.content {
  border: none;
  outline: none;
  font-size: 1.5rem;
  font-weight: 500;
  width: 100%;
}

input::-webkit-input-placeholder {
  color: #aab2bd;
}
</style>