const db = require('../db');

exports.todoStat = (req, res) => {
  let weekTimestamp = req.query.timestamp - 86400 * 7;
  const sql = 'select * from todo_table where timestamp > ? and timestamp < ?'
  db.query(sql, [weekTimestamp, req.query.timestamp], (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: '0',
      message: '获取近七日待办信息成功',
      data: results,
    })
  })
}