const express = require('express');
const app = express();

// 解决跨域
const cors = require('cors');
app.use(cors());

// 配置解析表单数据的中间件 （只能解析 application/x-www-form-urlencoded 格式）
app.use(express.urlencoded({ extended: false, limit: '3mb' }));

// 封装res.cc函数
// token
const expressJWT = require('express-jwt')
const config = require('./config')
// 验证请求头是否带有token
app.use(expressJWT.expressjwt({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({ path: [/^\/user/] }))

app.use((req, res, next) => {
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    })
  }
  next();
})

// 导入并使用路由模块
const todoRouter = require('./router/todo');
app.use('/todo', todoRouter);

const dailyTodoRouter = require('./router/daliyTodo')
app.use('/dailyTodo', dailyTodoRouter)

const statRouter = require('./router/stat')
app.use('/stat', statRouter)

// 导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/user', userRouter)

// 定义错误级别的中间件
app.use((req, res, next) => {
  if (err) return res.cc(err)
})

// 启动服务器
app.listen(80, () => {
  console.log('http://127.0.0.1');
})