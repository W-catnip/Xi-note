<template>
  <div class="border" @click="change()">
    <svg-icon iconClass="icon-check" class="icon" :class="{ checked: isCompleted == true }"></svg-icon>
  </div>
</template>

<script>
import { throttle } from '../../utils/index';
export default {
  name: "CheckBox",
  props: ["isCompleted"],
  methods: {
    change: throttle(function () {
      console.log(1);
      this.$emit('changeCompleted')
    }, 500)
  },
};
</script>

<style lang="less" scoped>
.border {
  margin: 0 1rem 0;
  border: 0.15rem solid @theme-color;
  border-radius: 50%;
  cursor: pointer;
}

.icon {
  transform: scale(0);
  transition: all 0.2s ease-out;
}

.checked {
  transform: scale(1.2);

  & {
    border: none;
  }
}
</style>