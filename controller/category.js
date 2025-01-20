const Category = require('../model/category')
const categoryController ={

getCategory: async (req,res) =>{
    const categoryList = await Category.find()

    if(!categoryList){
        res.status(500).json({success : false})
    }
    res.status(200).send(categoryList)
},
getCategoryById: async (req,res) =>{
    const category = await Category.findById(req.params.id)

    if(!category){
        res.status(500).json({message : 'The category with the given Id was not found'})
    }

    res.status(200).send(category)
},
creatCategory: async (req,res) =>{
    let category = new Category({
        name: req.body.name,
        color:req.body.color,
        icon: req.body.icon
    })
    category = await category.save()
    if(!category){
        return res.status(400).json({message : 'Failed to create category'})
    }
    res.send(category)
},
updateCategory: async (req,res) =>{
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon:req.body.icon,
            color:req.body.color
        },
        {new: true}
    )
    if(!category){
        return res.status(400).send('the category cannot be updated')
    }

    res.status(200).json(category)

},
deletCategory: async (req,res) =>{
    Category.findByIdAndRemove(req.params.id).then(category =>{
        if(category){
            res.status(200).json({success:true ,message : 'Category deleted'})
        }else{
        res.status(404).json({success:false ,message : 'Category not found'})
        }
    }).catch(err =>{
        return res.status(400).json({success:false , error : err });
        
    })
},
}
module.exports = categoryController