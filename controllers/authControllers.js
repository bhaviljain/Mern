const { hashPassword, comparePassword } = require('../helper/authHelper')
const userModel = require('../models/userModel')
const JWT = require('jsonwebtoken')
const registerCntrl = async(req,res) =>{
  try{
   const {name,email,password,phone,address,answer} = req.body
   //validation
   if(!name) return res.send({msg:"Name is required"})
   if(!email) return res.send({msg:"email is required"})
   if(!password) return res.send({msg:"password is required"})
   if(!address) return res.send({msg:"address is required"})
   if(!phone) return res.send({msg:"Phone is required"})
   if(!answer) return res.send({msg:"answer is required"})

//check user
    const existinguser = await userModel.findOne({email})
    //existing user
    if(existinguser) return res.status(200).send({msg:"email already registered"})

        //register user
         const hashedPassword = await hashPassword(password)
         const user =await new userModel({name,email,address,phone,password:hashedPassword,answer}).save()

         res.status(201).send({
          success:true,
          message:"user register successfull",user})

  }
  catch(error){
   console.log(error);
   res.status(500).send({
    success:false,
    message:"error",
    error
})
  }
}

const LoginCntrl =async (req,res)=>{
try{
const {email,password} = req.body
if(!email || !password) return res.status(404).json({msg:"Invalid email or password"})

//check user
const user = await userModel.findOne({email})
if(!user) return res.status(404).send({message:"email not registered"})

const match = await comparePassword(password,user.password)
if(!match) return res.status(200).send({
  success: false,
  message:"Invalid password"})


  //token
  const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})
  res.status(200).send({
    success: true,
    message:"login sucess",user:{
    _id:user.id,
    name:user.name,
    email:user.email,
    phone:user.phone,
    address:user.address,
    role:user.role
  },
token
})
}
catch(error){
  console.log(error)
  res.status(500).send({message:"Wrong credentials"})
}
}
const testContrl = (req,res)=>{
res.send("protected")
}
const forgotPasswordController=async(req,res)=>{
try{
  const {email,answer,newpassword}= req.body
  if(!email) res.status(400).send({message:"Email is required"})
  if(!answer) res.status(400).send({message:"Email is required"})
  if(!newpassword) res.status(400).send({message:"Email is required"})

    const user = await userModel.findOne({email,answer})
    if(!user) res.status(404).send({success:false,
      message:"wrong email or Answer"
    })
    const hashed = await hashPassword(newpassword)
    await userModel.findByIdAndUpdate(user._id,{password:hashed})
    res.status(200).send({
      success:true,
      message:"Password reset successfully"
    })
}
catch(error){
  console.log(error);
  res.status(500).send({
    success:false,
    message:"Something wnet wrong",
    error
  })
}
}

module.exports = {registerCntrl,LoginCntrl,testContrl,forgotPasswordController}