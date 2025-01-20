const express = require('express')
const router = express.Router()
const ProductController = require('../controller/products')
const Category = require('../model/category')

router.get('/', ProductController.getProducts)
router.get('/:id', ProductController.getProductById)
router.get('/get/count', ProductController.getProductCount)
router.get('/get/featured/:count', ProductController.getProductFeatured)
router.post('/', ProductController.creatProduct)
router.put('/:id',ProductController.updateProduct)
router.delete('/:id',ProductController.deleteProduct)

module.exports = router