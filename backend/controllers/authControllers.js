const User = require("../models/User")
const jwt = require("jsonwebtoken")
const generateAccountNumber = require("../utils/generateAccountNumber")

const SECRET = process.env.JWT_SECRET

async function signup(req,res){
  try{
    const {name,email,password} = req.body
    const exists = await User.findOne({email})
    if(exists) return res.status(400).json({message:"Email Already exist"})
      let accountNumber = generateAccountNumber();

    while(await User.findOne({accountNumber})){
      accountNumber = generateAccountNumber()
    }
    const user = new User({name,email,password,accountNumber})
    await user.save()

    const token = jwt.sign({
      id:user._id,email:user.email,accountNumber:user.accountNumber
    },SECRET,{expiresIn:"1h"})

    res.json({
      message:"Signup successful",
      token,
      user:{name,email,accountNumber,balance:user.balance}
    })

  }catch(err){
      res.status(500).json({message:"Signup failed"})
  }

}

async function login(req,res){
  try{
      const {email,password} = req.body
      const user = await User.findOne({email})
      if(!user || user.password !== password){
        return res.status(401).json({message:"Invalid credentials"})
      }

      const token = jwt.sign({id:user._id,email:user.email,accountNumber:user.accountNumber},SECRET,{expiresIn:"5d"})

      res.json({
        message:"Login success",
        token,
        user:{name:user.name,email:user.email,accountNumber:user.accountNumber,balance:user.balance}
      })
  }catch(err){
      res.status(500).json({message:"Login failed"})
  }
}

 module.exports = {signup,login}