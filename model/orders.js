const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderItems:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'OrderItem',
        required: true
    }],
    shippingAddress1: {
        type: String,
        required: true
    },
    shippingAddress2: {
        type: String
    },
    city: {
        type: String,
        default : ''
    },
    zip: {
        type: String,
        default : ''
    },
    country: {
        type: String,
        default : ''
    },
    phone : {
        type: String,
        required: true
    },
    status : {
        type: String,
        required: true,
        default : 'Pandding'
    },
    totalPrice: {
        type: Number,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    dateOrdered:  {
        type : Date,
        default: Date.now
    }
})

orderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

orderSchema.set('toJSON', {
    virtuals: true,
});

const Order = mongoose.model('Order', orderSchema)
module.exports = Order

