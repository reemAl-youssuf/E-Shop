const Product = require('../model/products')
const mongoose = require('mongoose')
const Category = require('../model/category')

const ProductController = {

getProducts:async(req,res)=>{
    let filter = {};
    if(req.query.categories)
    {
        filter = {category: req.query.categories.split(',')}
    }

    const productList = await Product.find(filter).populate('category');

    if(!productList) {
        res.status(500).json({success: false})
    } 
    res.send(productList);
},
getProductById:async(req,res)=>{
    const product = await Product.findById(req.params.id).populate('category')
    if(!product){
        res.status(404).json({success:false, message: 'Product not found'})
    }
        res.status(200).send(product)  
},
creatProduct:async(req,res)=>{
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category')

    let product = new Product ({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image:req.body.image,
        //images:req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured:req.body.isFeatured,
        //dateCreates:req.body.dateCreates
    })
    product = await product.save()
    if(!product){
        res.status(400).json({success:false, message: 'Failed to create product'})
    }
    res.send(product)
},
updateProduct:async(req,res)=>{
    if(!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id')
    }
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category')

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image:req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured:req.body.isFeatured,
        },
        {new: true}
    )
    if(!product){
        return res.status(400).send('the product cannot be updated')
    }

    res.status(200).json(product)
},
deleteProduct:async(req,res)=>{
    Product.findByIdAndRemove(req.params.id).then(product => {
        if(product){
            res.status(200).json({success: true, message:'Product deleted successfully'})
        }else{
            res.status(404).json({success: false, message: 'Product not found'})
        }
    }).catch(err =>{
        return res.status(500).json({success:false , error : err });
    })
},
getProductCount:async(req,res)=>{
    const productCount = await Product.countDocuments()

    if(!productCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        productCount: productCount
    });
},
getProductFeatured:async(req,res)=>{
    const count = req.params.count ? req.params.count : 0
    const products = await Product.find({isFeatured: true}).limit(count)

    if(!products) {
        res.status(500).json({success: false})
    } 
    res.send(products);
}

}
module.exports = ProductController