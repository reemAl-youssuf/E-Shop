const mongoose = require('mongoose');
const { product } = require('./products');

const orderItemSchema = mongoose.Schema({
    product: {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Product'
        },
    quantity : {
        type: Number,
        required: true
    }
})


orderItemSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

orderItemSchema.set('toJSON', {
    virtuals: true,
});


const OrderItem = mongoose.model('OrderItem',  orderItemSchema)
module.exports = OrderItem