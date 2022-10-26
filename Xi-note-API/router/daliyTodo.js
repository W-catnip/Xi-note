const express = require('express');
const router = express.Router();

const routerHandler = require('../router-handler/dailyTodo')

router.get('/get', routerHandler.get)
router.post('/add', routerHandler.add)
router.post('/edit', routerHandler.edit)
router.post('/delete', routerHandler.delete)
router.post('/change', routerHandler.change)

module.exports = router