const express = require('express')
const router = express.Router()
const categoryController = require('../controller/category')


router.get('/' , categoryController.getCategory)
router.get('/:id' , categoryController.getCategoryById)
router.post('/' , categoryController.creatCategory)
router.put('/:id' , categoryController.updateCategory)
router.delete('/:id' , categoryController.deletCategory)

module.exports = router