const express = require('express');
const router = express.Router();
const routerHandler = require('../router-handler/stat')

router.get('/todo', routerHandler.todoStat)

module.exports = router;