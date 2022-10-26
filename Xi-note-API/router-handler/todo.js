const db = require('../db/index')

// 处理获取指定日期待办事项的函数
exports.getTodo = (req, res) => {
  const sqlStr = 'select * from todo_table where timestamp = ?'
  db.query(sqlStr, req.query.timestamp, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: '0',
      message: '获取该日待办信息成功',
      data: results,
    })
  })
}

// 处理添加指定日期待办事项的函数
exports.addTodo = (req, res) => {
  const str = 'select * from todo_table where content = ? AND timestamp = ?'
  db.query(str, [req.body.content, req.body.timestamp], (err, results) => {
    if (err) return res.cc(err);
    if (results.length >= 1) return res.cc('该待办事项已存在');
    const sql = 'insert into todo_table (content,timestamp) value(?,?)'
    db.query(sql, [req.body.content, req.body.timestamp], (err, results) => {
      if (err) return res.cc(err);
      if (results.affectedRows !== 1) return res.cc('新增待办失败');
      res.send({
        status: 0,
        message: '新增待办事项成功'
      }
      );
    })
  })
}

// 处理编辑待办事项的函数
exports.editTodo = (req, res) => {
  const str = 'select * from todo_table where content = ? AND timestamp = ?'
  db.query(str, [req.body.content, req.body.timestamp], (err, results) => {
    if (err) return res.cc(err);
    if (results.length >= 1) return res.cc('该待办事项已存在');
    const sql = 'update todo_table set content = ? where id = ?'
    db.query(sql, [req.body.content, req.body.id], (err, results) => {
      if (err) return res.cc(err);
      if (results.affectedRows !== 1) return res.cc('编辑待办事项失败');
      res.send({
        status: 0,
        message: '编辑待办事项成功',
        data: { ...req.body }
      });
    })
  })
}

// 处理删除待办事项的函数
exports.deleteTodo = (req, res) => {
  const str = 'delete from todo_table where id = ?'
  db.query(str, req.query.id, (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc('删除失败');
    res.send({
      status: 0,
      message: '删除待办事项成功'
    })
  })
}

// 更改打卡完成状态
exports.changeTodo = (req, res) => {
  const str = 'update todo_table set is_completed = is_completed ^ 1 where id = ?'
  db.query(str, req.query.id, (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc('状态更改失败');
    res.send('更改待办完成状态成功')
  })
}