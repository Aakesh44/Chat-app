const express = require('express')
const router = express.Router()

const auth = require('../middleware/authorization')
const postCont = require('../controller/postCont')

router.route('/create').post(auth,postCont.createPost)

router.route('/all-posts').get(postCont.getPosts)

router.route('/like/:id').put(auth,postCont.like) 

router.route('/dislike/:id').put(auth,postCont.dislike)

router.route('/save/:id').put(auth,postCont.save)





module.exports = router