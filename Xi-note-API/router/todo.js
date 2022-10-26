// 创建路由实例对象
const express = require('express');
const router = express.Router();

// 引入路由处理函数
const routerHandler = require('../router-handler/todo');

// 获取指定日期待办信息：
router.get('/getTodo', routerHandler.getTodo)

// 添加指定日期待办信息：
router.post('/addTodo', routerHandler.addTodo)

// 根据id更新指定待办信息：
router.post('/editTodo', routerHandler.editTodo)

// 根据id删除指定待办信息：
router.post('/deleteTodo', routerHandler.deleteTodo)

// 更改代待办信息完成状态
router.post('/changeTodo', routerHandler.changeTodo)

module.exports = router;