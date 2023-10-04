const express = require('express')
const router = express.Router()

const auth = require('../middleware/authorization')

const chatCont = require('../controller/chatCont')

router.route('/get-create-chat').post(auth,chatCont.getAndCreateChat)
router.route('/getAllChats/:id').get(auth,chatCont.getAllChats)

router.route('/create-groupchat').post(auth,chatCont.createGroupChat)
router.route('/getGroup/:id').get(auth,chatCont.getGroupChat)

router.route('/rename').put(auth,chatCont.renameChat)
router.route('/change-admin').put(auth,chatCont.changeAdmin)
router.route('/group-add').put(auth,chatCont.addToGroupChat)
router.route('/group-remove').put(auth,chatCont.removeFromGroupChat)

router.route('/delete-group/:id').delete(auth,chatCont.deleteGroup)

router.route('/update').put(chatCont.update)

module.exports = router