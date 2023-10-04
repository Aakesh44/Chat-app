const express = require('express')
const router = express.Router()

const requestValid = require('../middleware/reqValidation')
const auth = require('../middleware/authorization')


const userCont = require('../controller/userCont')
const getUsers = require('../controller/getUser')

router.route('/sign-in').post(
    requestValid.requestBody,
    requestValid.requestValid,
    userCont.signIn
)

router.route('/log-in').post(userCont.logIn)

router.route('/edit-user').put(userCont.edit)

router.route('/add-friend').put(auth,userCont.addToFriend)
router.route('/remove-friend').put(auth,userCont.removeFromFriend)

router.route('/all-users').get(auth,getUsers.getAllUsers)

router.route('/getuser/:id').get(auth,getUsers.getSingleUser)




module.exports = router