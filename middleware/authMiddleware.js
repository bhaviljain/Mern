const JWT = require("jsonwebtoken")
const userModel = require("../models/userModel")

const requireSignIn = async(req,res,next)=>{
    try{
        const decode = JWT.verify(req.headers.authorization,process.env.JWT_SECRET)
        req.user = decode
        next()
    }
    catch(error){
        console.log(error);
    }
}

const isAdmin =async(req,res,next)=>{
 try{
    const user = await userModel.findById(req.user._id)
    if(user.role !== 1) return res.status(404).json({msg:"Unauthorized access"})
        next()
 }
 catch(error){
    res.status(404).json({msg:error.message})
 }
}

module.exports = {requireSignIn,isAdmin}