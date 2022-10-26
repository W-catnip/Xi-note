import { addDaily, deleteDaily, editDaily, getDaily, changeDailyCompleted } from '@/http/api/dailyTodo';
import { getTodoStat } from '@/http/api/stat';
import { getTodo, editTodo, deleteTodo, addTodo, changeTodoCompleted } from '@/http/api/todo';
import { getProfile, getUser, updateNick, updateProfile, updatePwd, userLogin, userLogup } from '@/http/api/user';
import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routers: [{
      iconClass: "icon-todo",
      value: "我的待办",
      to: "/todo",
    },
    {
      iconClass: "icon-dash",
      value: "数据统计",
      to: "/dashboard",
    },
    {
      iconClass: "icon-setting",
      value: "设置",
      to: "/setting",
    },
    {
      iconClass: "icon-about",
      value: "关于",
      to: "/about",
    },
    ],
    // 当前选中日期的时间戳
    timestamp: null,
    // 待办事项渲染数组
    todoData: [],
    // 每日待办渲染数组
    dailyTodo: [],
    // 今日时间戳
    todayTimestamp: new Date(new Date().toLocaleDateString()).getTime() / 1000,
    // 近七日待办事项统计数据
    todoStat: [],
    // 用户信息
    userInfo: [],
    // 头像
    profile: null,
  },
  getters: {
    // 待办事项完成情况
    todoTotal(state) {
      if (!state.todoData) return 0;
      return state.todoData.length;
    },
    dailyTotal(state) {
      if (!state.dailyTodo) return 0;
      const dailyTodo_notDel = state.dailyTodo.filter(item => !item.is_deleted)
      return dailyTodo_notDel.length;
    },
    // 收集完成的事项或者打卡
    todoCompleted(state) {
      if (!state.todoData) return 0;
      let completed = [];
      state.todoData.forEach(element => {
        if (element.is_completed) {
          completed.push(element)
        }
      });
      return completed.length;
    },
    dailyCompleted(state) {
      if (!state.dailyTodo) return 0;
      let completed = [];
      state.dailyTodo.forEach(element => {
        if (element.is_completed) {
          completed.push(element)
        }
      });
      return completed.length;
    }
  },
  mutations: {
    updateTimestamp(state, timestamp) {
      state.timestamp = timestamp;
    },
    getTodoData(state, data) {
      state.todoData = data;
    },
    // 将更改的待办事项应用到todoData中
    updateTodoData(state, data) {
      const index = state.todoData.findIndex((item) => item.id == data.id);
      state.todoData[index].content = data.content;
    },
    getDaily(state, data) {
      state.dailyTodo = data;
    },
    getTodoStat(state, data) {
      state.todoStat = data;
    },
    getUser(state, data) {
      state.userInfo = data;
    },
    changeProfile(state, data) {
      state.profile = data;
    },
    changeNickname(state, data) {
      state.userInfo.nickname = data.nickname;
    }
  },
  actions: {
    // 更新时间戳
    updateTimestamp(context, timestamp) {
      context.commit('updateTimestamp', timestamp);
      context.dispatch('getTodoData', timestamp);
    },
    // 网络请求：
    // 请求当日的待办事项数据
    async getTodoData(context, timestamp) {
      const response = await getTodo(timestamp);
      context.commit('getTodoData', response.data);
    },
    // 新增待办事项
    async addTodoData(context, todoData) {
      const response = await addTodo(todoData);
      context.dispatch('getTodoData', context.state.timestamp);
    },
    // 编辑指定待办事项
    async editTodoData(context, todo) {
      console.log(todo);
      const response = await editTodo(todo);
      if (response.status === 0) {
        context.commit('updateTodoData', response.data);
      }
    },
    // 删除指定待办事项
    async deleteTodoData(context, id) {
      const reponse = await deleteTodo(id);
      context.dispatch('getTodoData', context.state.timestamp);
    },
    // 请求每日打卡数据
    async getDaily(context) {
      const response = await getDaily();
      context.commit('getDaily', response.data)
    },
    // 新增每日打卡数据
    async addDaily(context, todoData) {
      const response = await addDaily(todoData);
      context.dispatch('getDaily')
    },
    // 编辑每日打卡数据
    async editDaily(context, todoData) {
      const response = await editDaily(todoData);

      context.dispatch('getDaily');
    },
    // 删除每日打卡
    async deleteDaily(context, id) {
      const response = await deleteDaily(id);
      context.dispatch("getDaily");
    },
    // 更改待办完成情况
    async changeTodoCompleted(context, item) {
      const response = await changeTodoCompleted(item.id);
      context.dispatch('getTodoData', item.timestamp)
    },
    async changeDailyCompleted(context, id) {
      const response = await changeDailyCompleted(id);
      context.dispatch('getDaily')
    },
    // 请求之前七天的待办事项完成情况
    async getTodoStat(context, timestamp) {
      const response = await getTodoStat(timestamp);
      context.commit("getTodoStat", response.data)
    },
    // 用户注册请求
    async userLogup(context, data) {
      const response = await userLogup(data)
    },
    // 用户登录请求
    async userLogin(context, data) {
      const response = await userLogin(data)
      // 将token与id储存在localStorage中
      if (response.token) {
        window.localStorage.setItem('token', response.token)
        window.localStorage.setItem('id', response.data.id)
        router.push({ path: '/' })
      }
      context.commit('getUser', response.data)
    },
    // 更改头像请求
    async updateProfile(context, data) {
      const response = await updateProfile(data);
      const { profile } = await getProfile(data.id);
      context.commit('changeProfile', profile)
    },
    // 获取用户数据
    async getUser(context, id) {
      const response = await getUser(id);
      const { profile } = await getProfile(id);
      context.commit('getUser', response.data)
      context.commit('changeProfile', profile)
    },
    // 请求更改昵称
    async updateNick(context, data) {
      const response = await updateNick(data);
      context.commit('changeNickname', data)
    },
    // 更改密码
    async updatePwd(context, data) {
      const response = await updatePwd(data);
    }
  },
  modules: {
  }
})
