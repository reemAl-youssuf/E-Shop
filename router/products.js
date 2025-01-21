const express = require('express')
const router = express.Router()
const ProductController = require('../controller/products')
const Category = require('../model/category')
const multer = require('multer')
const uploadOptions = require('../helper/uploadImage')

router.get('/', ProductController.getProducts)
router.get('/:id', ProductController.getProductById)
router.get('/get/count', ProductController.getProductCount)
router.get('/get/featured/:count', ProductController.getProductFeatured)
router.post('/',uploadOptions.single('image'), ProductController.creatProduct)
router.put('/:id',ProductController.updateProduct)
router.delete('/:id',ProductController.deleteProduct)
router.put('/gallery-images/:id',uploadOptions.array('images', 12), ProductController.UpdateImages)


module.exports = router