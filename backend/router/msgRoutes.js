const express = require('express')
const router = express.Router()

const auth = require('../middleware/authorization')

const msgCont = require('../controller/msgCont')

router.route('/send').post(auth,msgCont.sendMsg)

router.route('/fetch/:id').get(auth,msgCont.fetchMsg)


module.exports = router