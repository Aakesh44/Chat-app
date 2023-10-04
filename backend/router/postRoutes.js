const express = require('express')
const router = express.Router()

const postCont = require('../controller/postCont')

router.route('/create').post(postCont.createPost)



module.exports = router