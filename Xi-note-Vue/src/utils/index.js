
// 防抖节流函数封装

// 防抖
export const debounce = function (fn, delay, immediate = true) {
  // 声明计时器
  let timer = null; let flag = true;
  return function () {
    // 保存调用时的上下文
    const context = this;
    // 保存调用时的参数
    const args = arguments;
    // 如果timer存在则清除
    if (timer) {
      clearTimeout(timer);
    }
    // 如果第一次触发需要执行
    if (immediate) {
      if (flag) {
        fn.call(context, args);
        flag = false;
      } else {
        timer = setTimeout(() => {
          fn.call(context, args);
          flag = true;
        }, delay)
      }
    } else {
      timer = setTimeout(() => {
        fn.call(context, args);
      }, delay)
    }
  }
};

// 节流
export const throttle = function (fn, delay, immediate = true) {
  if (immediate) {
    let pre = 0;
    return function () {
      let now = Date.now();
      let context = this;
      let args = arguments;
      if (now - pre > delay) {
        fn.call(context, args);
        pre = now;
      }
    }
  } else {
    let timer = null
    return function () {
      const context = this;
      const args = arguments;
      if (!timer) {
        timer = setTimeout(() => {
          fn.call(context, args);
          timer = null;
        }, delay)
      }
    }
  }
}