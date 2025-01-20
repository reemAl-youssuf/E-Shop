const express = require('express')
const router = express.Router()
const OrderController = require('../controller/orders')

router.get('/',OrderController.getOrdersList)
router.get('/:id',OrderController.getOrder)
router.get('/get/sales',OrderController.getTotalSales)
router.get('/get/count',OrderController.getOrderCount)
router.get('/get/userorders/:userid',OrderController.getUserOrders)
router.post('/', OrderController.CreateOrder)
router.put('/:id',OrderController.UpdateOrder)
router.delete('/:id',OrderController.DeleteOrder)
module.exports = router