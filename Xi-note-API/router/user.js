const express = require('express')
const router = express.Router()

const routerHandler = require('../router-handler/user')
router.post('/logup', routerHandler.logup)
router.post('/login', routerHandler.login)
router.post('/updateProfile', routerHandler.updateProfile)
router.get('/get', routerHandler.getUser)
router.get('/profile', routerHandler.getProfile)
router.post('/updateNick', routerHandler.updateNick)
router.post('/updatePwd', routerHandler.updatePwd)

module.exports = router;