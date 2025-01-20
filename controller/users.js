const User= require('../model/users')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt') 
const jwt = require('jsonwebtoken')


const UserController = {
getUsers: async(req,res)=>{
    const users =  await User.find().select('-passwordHash')
    if(!users){
        res.status(400).json({success:false})
    }
    res.send(users)
},

getUser: async(req,res)=>{
    const user = await User.findById(req.params.id).select('-passwordHash')
    if(!user){
        res.status(400).json({success: false})
    }
    res.send(user)
},
CreateUser:async(req,res)=>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password,10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street :  req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        country:req.body.country,
        city: req.body.city,
    })
    user = await user.save()
    if(!user){
        return res.status(400).json({success:false, message: 'Failed to create user'})
    }
    res.send(user)

},
RegisterUser:async(req,res)=>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password,10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street :  req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        country:req.body.country,
        city: req.body.city,
    })
    user = await user.save()
    if(!user){
        return res.status(400).json({success:false, message: 'Failed to create user'})
    }
    res.send(user)

},

LoginUser:async(req,res)=>{
    const user = await User.findOne({email: req.body.email})
    const secret = process.env.secret
    if(!user){
        return res.status(400).json({success:false , message:'the user not fount'})
    }
    if(user && bcrypt.compareSync(req.body.password , user.passwordHash)){
        const token = jwt.sign(
            {
                userId : user.id,
                isAdmin: user.isAdmin
            },
            secret,
            {expiresIn : '1d'}
        )

        res.status(200).send({user: user.email , token})
    }else{
        return res.status(400).send('password wrong')
    }

},
getUserCount:async(req,res)=>{
    const userCount = await User.countDocuments()

    if(!userCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        userCount: userCount
    });
},
deleteUser:async(req,res)=>{
    User.findByIdAndRemove(req.params.id).then(user => {
        if(user){
            res.status(200).json({success: true, message:'user deleted successfully'})
        }else{
            res.status(404).json({success: false, message: 'user not found'})
        }
    }).catch(err =>{
        return res.status(500).json({success:false , error : err });
    })
},




}
module.exports = UserController
