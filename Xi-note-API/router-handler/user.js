const db = require('../db')
const jwt = require('jsonwebtoken')
// 导入密钥
const config = require('../config')

// 用户注册
exports.logup = (req, res) => {
  const userinfo = req.body;
  // 检查 用户名是否被占用
  const sql = 'select * from user_table where username = ?'
  db.query(sql, userinfo.username, (err, results) => {
    if (err) return res.cc(err);
    if (results.length > 0) return res.cc('用户名已被占用');
  })
  // 注册
  const insertSql = 'insert into user_table set ? '
  db.query(insertSql, { nickname: userinfo.nickname, username: userinfo.username, password: userinfo.password }, (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc('注册失败，请稍后再试')
    res.send({
      status: 0,
      message: '注册成功！'
    })
  })
}

// 用户登录
exports.login = (req, res) => {
  const userinfo = req.body;
  const sql = 'select * from user_table where username = ?'
  db.query(sql, userinfo.username, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc('登录失败');
    // 判断密码是否正确
    const judgement = userinfo.password == results[0].password;
    if (!judgement) return res.cc('密码或用户名错误');
    // 生成token并返回给客户端
    const userStr = { ...results[0], password: '', profile: '', nickname: '' };
    // 用用户的信息进行加密
    const tokenStr = jwt.sign(userStr, config.jwtSecretKey, { expiresIn: config.expiresIn })
    res.send({
      status: 0,
      message: '登录成功！',
      data: { ...results[0], password: '' },
      token: 'Bearer ' + tokenStr
    })
  })
}

// 修改头像
exports.updateProfile = (req, res) => {
  const str = 'update user_table set profile = ? where id = ?'
  db.query(str, [req.body.profile, req.query.id], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc('更新头像失败', results);
    res.send({
      status: '0',
      message: '更新头像成功！',
      data: req.body
    })
  })
}

// 请求用户信息
exports.getUser = (req, res) => {
  const sql = 'select * from user_table where id = ?'
  db.query(sql, req.query.id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc('获取用户信息失败')
    const userinfo = results[0]
    const data = { id: userinfo.id, username: userinfo.username, nickname: userinfo.nickname }
    res.send({
      status: 0,
      message: '获取用户信息成功',
      data
    })
  })
}

// 请求头像
exports.getProfile = (req, res) => {
  const sql = 'select profile from user_table where id = ?'
  db.query(sql, req.query.id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc('获取头像失败')
    res.send(results[0])
  })
}

// 更改昵称
exports.updateNick = (req, res) => {
  const sql = 'update user_table set nickname = ? where id = ?'
  db.query(sql, [req.body.nickname, req.body.id], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc('更新昵称失败')
    res.send({
      status: 0,
      message: '更新昵称成功'
    })
  })
}

// 更改密码
exports.updatePwd = (req, res) => {
  const sql = 'select password from user_table where id = ?'
  db.query(sql, req.body.id, (err, results) => {
    if (err) return res.cc(err);
    if (req.body.oldPwd !== results[0].password) return res.cc('密码错误')
    const str = 'update user_table set password = ? where id = ?'
    db.query(str, [req.body.newPwd, req.body.id], (err, results) => {
      if (err) return res.cc(err);
      if (results.affectedRows !== 1) return res.cc('更新密码失败')
      res.send({
        status: 0,
        message: '更新密码成功'
      })
    })
  })
}