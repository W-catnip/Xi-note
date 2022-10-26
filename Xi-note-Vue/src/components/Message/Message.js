// 弹窗组件的逻辑
import Vue from 'vue';
import vMessage from './Message.vue'

//装有instance消息弹框组件对象的容器
let instances = [];

// 创建弹窗的函数
function Message(data) {
  data = data || {};
  if (typeof data === 'string') {
    data = {
      message: data
    }
  };
  data.onClose = function () {
    // instance是消息弹框组件的实例对象
    Message.close(instance);
  }

  const vMessageClass = Vue.extend(vMessage);

  //得到的是一个组件对象VueComponent实例
  //new vMessageClass接收的是一个包含组件选项的对象 覆盖
  let instance = new vMessageClass({
    data
  })

  instance.$mount();
  // 挂载后才可以访问$el
  document.body.appendChild(instance.$el);

  let offset = data.offset || 20;

  let offsetTop = offset;

  instances.forEach(item => {
    //上一个实例对象的offsetTop+自身的高度+规定的间隔
    offsetTop += item.$el.offsetHeight + offset;
  })

  instance.$el.style.top = offsetTop + 'px';
  instances.push(instance);
}

// 关闭弹窗
Message.close = function (instance) {
  let removeHeight = instance.$el.offsetHeight + instance.offset;
  let index = instances.findIndex(item => item === instance);
  //每消失一个就得把在instances容器中对应的该组件对象给删除掉
  instances = instances.filter(item => item !== instance);
  for (let i = index; i < instances.length; i++) {
    instances[i].$el.style.top = parseFloat(instances[i].$el.style.top) - removeHeight + 'px';
  }
}

const dataArr = ['info', 'success', 'error', 'warning']
dataArr.forEach(type => {
  Message[type] = function (data) {
    if (typeof data === 'string') {
      data = {
        message: data
      }
      data.type = type;
      return Message(data);
    }
  }
})

export default Message;