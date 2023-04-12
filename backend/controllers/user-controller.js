const User = require("../models/user")
const bcrypt = require('bcryptjs')

const getAllUser = async(req,res,next)=>{
    let users
    try{
        users = await User.find()
    }catch(err){
        console.log(err)
    }
    if(!users){
        res.status(404).json({message:"No users found"})
    }
    return res.status(200).json({users})

}

const signup = async(req,res,next)=>{
    const {name,email,password} = req.body
    let existingUser 
    try{
        existingUser = await User.findOne({email})
    }catch(err){
        console.log(err)
    }
    if(existingUser){
        return res.status(400).json({message:"User Already Exist Login Instead"})
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password,salt)
    const user = new User({
        name,
        email,
        password: hashedPassword,
        quotes:[]
    })
    try{
        await user.save()
        .then(resResult=>{
            return res.status(201).json({msg:"User Regiestered Successfully",results:resResult})
        })
    }catch(err){
        console.log(err)
    }
    

}

const login = async(req,res,next)=>{
    const {email, password} = req.body
    let existingUser
    try{
        existingUser = await User.findOne({email})
    }catch(err){
        console.log(err)
    }
    if(!existingUser){
        return res.status(404).json({message:"Couldnt find User by this email"})
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
    if(!isPasswordCorrect){
        return res.status(400).json({message: "Incorrect Password"})
    }
    return res.status(200).json({message:"Login Successfull",resUser: existingUser,status: 'success'})
}



module.exports={
    getAllUser,
    signup,
    login
}