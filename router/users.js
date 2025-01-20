const express = require('express')
const router = express.Router()
const UserController = require('../controller/users')

router.get('/', UserController.getUsers)
router.get('/:id', UserController.getUser)
router.get('/get/count', UserController.getUserCount)
router.post('/',UserController.CreateUser)
router.post('/login',UserController.LoginUser)
router.post('/register',UserController.RegisterUser)
router.delete('/:id', UserController.deleteUser)



module.exports = router