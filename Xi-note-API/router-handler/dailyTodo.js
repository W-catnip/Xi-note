// 每日打卡的路由处理函数
const db = require('../db');

exports.get = (req, res) => {
  const sql = 'select * from dailytodo_table';
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: '0',
      message: '获取打卡数据成功',
      data: results,
    })
  })
}

exports.add = (req, res) => {
  const sql = 'select * from dailytodo_table where is_deleted = 0 AND content = ?'
  db.query(sql, req.body.content, (err, results) => {
    if (err) return res.cc(err);
    if (results.length >= 1) return res.cc('该打卡事项已存在');
    const sqlStr = 'insert into dailytodo_table (content) value (?)'
    db.query(sqlStr, req.body.content, (err, results) => {
      if (err) return res.cc(err);
      if (results.affectedRows !== 1) return res.cc('添加打卡事项失败');
      res.send({
        status: 0,
        message: '添加打卡事项成功'
      })
    })
  })
}

exports.edit = (req, res) => {
  const sql = 'select * from dailytodo_table where content = ?'
  db.query(sql, [req.body.content, req.body.id], (err, results) => {
    if (err) return res.cc(err);
    if (results.length >= 1) return res.cc('该打卡事项已存在');
    const sqlStr = 'update dailytodo_table set content = ? where id = ?'
    db.query(sqlStr, [req.body.content, req.body.id], (err, results) => {
      if (err) return res.cc(err);
      if (results.affectedRows !== 1) return res.cc('编辑打卡事项失败');
      res.send({
        status: 0,
        message: '编辑打卡事项成功',
        data: { ...req.body }
      });
    })
  })
}

exports.delete = (req, res) => {
  const str = 'update dailytodo_table set is_deleted = 1 where id = ?'
  db.query(str, req.query.id, (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc('删除失败');
    res.send('删除待办事项成功')
  })
}

exports.change = (req, res) => {
  const str = 'update dailytodo_table set is_completed = is_completed ^ 1 where id = ?'
  db.query(str, req.query.id, (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc('状态更改失败');
    res.send('更改打卡完成状态成功')
  })
}