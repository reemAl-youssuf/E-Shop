const Order = require('../model/orders')
const OrderItem = require('../model/orderItems')

const OrderController = {
getOrdersList:async(req,res)=>{
        const orders =  await Order.find().populate('user','name').sort({'dateOrdered': -1})
        if(!orders){
            res.status(400).json({success:false})
        }
        res.send(orders)
    },

getOrder:async(req,res)=>{
        const order = await Order.findById(req.params.id)
        .populate('user','name')
        .populate({
            path : 'orderItems' , populate: {
                path:'product', populate:'category'} 
            })
    if(!order){
        res.status(404).json({success:false, message: 'order not found'})
    }
        res.status(200).send(order) 
    },

CreateOrder: async(req,res) => {

    const orderItemsIds = Promise.all(req.body.orderItems.map(async orderItem => {
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        })
        newOrderItem = await newOrderItem.save()
        return newOrderItem._id
    })) 
    const orderItemIdsResolved = await orderItemsIds
    
    const totalPrices = await Promise.all(orderItemIdsResolved.map(async(orderItemId)=>{
        const orderItem = await OrderItem.findById(orderItemId).populate('product','price')
        const totalPrice = orderItem.product.price * orderItem.quantity
        return totalPrice
    }))

    const totalPrice = totalPrices.reduce((a,b) => a+b, 0)

    let order = new Order({
        orderItems: orderItemIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country:req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        user: req.body.user
    })
    order = await order.save()
    if(!order){
        res.status(400).send('the order cannot be created!')
    }

    res.send(order)
},

UpdateOrder:async(req,res)=>{
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status,
        },
        {new: true}
    )
    if(!order){
        return res.status(400).send('the order cannot be updated')
    }

    res.status(200).json(order)

},

DeleteOrder:async(req,res)=>{
    Order.findByIdAndRemove(req.params.id).then(async order =>{
        if(order){
            await order.orderItems.map(async orderItem =>{
                await OrderItem.findByIdAndRemove(orderItem)
            })
            res.status(200).json({success:true ,message : 'order deleted'})
        }else{
        res.status(404).json({success:false ,message : 'order not found'})
        }
    }).catch(err =>{
        return res.status(400).json({success:false , error : err });
        
    })
},

getTotalSales:async(req,res)=>{
    const totalSales = await Order.aggregate([
        { $group: { _id: null, totalsales: { $sum: "$totalPrice" } } },
    ])
    if(!totalSales){
        res.status(400).json({success:false, message: 'The order sales cannot be generated'})
    }
    res.send({totalsales : totalSales.pop().totalsales})
},
getOrderCount:async(req,res)=>{
    const orderCount = await Order.countDocuments()

    if(!orderCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        orderCount: orderCount
    });
},
getUserOrders:async(req,res)=>{
    const userOrders =  await Order.find({user: req.params.userid}).populate({
        path : 'orderItems' , populate: {
            path:'product', populate:'category'} 
        }).sort({'dateOrdered': -1})
    if(!userOrders){
        res.status(400).json({success:false})
    }
    res.send(userOrders)
},
}
module.exports = OrderController