const {default:mongoose} = require('mongoose')
const Quote = require('../models/Quote')
const User = require('../models/user')

const getAllQuotes = async(req,res,next)=>{
    let quotes
    try{
        quotes = await Quote.find().populate("user")
    }catch(err){
        console.log(err)
    }
    if(quotes){
        return res.send({quotes:quotes})
    }
    return res.status(404).json({message:"No Quotes Found"})
}

const addQuote = async(req,res,next)=>{
    const { quote,author,categories,image,datetime,user } = req.body
    
    let existingUser
    try{
        existingUser = await User.findById(user)
    }catch(err){
        return console.log(err)
    }
    if(!existingUser){
        res.status(400).json({message:"Unable to Find user by this Id"})
    }
    
    const quotes = new Quote({
        quote,
        author,
        categories,
        image,
        datetime,
        user
    })
    try{
        const session = await mongoose.startSession()
        session.startTransaction()
        await quotes.save({session})
        existingUser.quotes.push(quotes)
        await existingUser.save({session})
        await session.commitTransaction()

    }catch(err){
        console.log(err)
        res.status(500).json({message:err})
    }
    return res.status(200).json({quotes})
}

const updateQuote = async(req,res,next)=>{
    const { quote, author, categories } = req.body
    const quoteId = req.params.id
    let quotes
    try{
        quotes = await Quote.findByIdAndUpdate(quoteId,{
            quote,
            author,
            categories
        })
    }catch(err){
        console.log(err)
    }
    if(!quotes){
        return res.status(500).json({message:"Unable to Update Quote"})
    }
    return res.status(200).json({quotes})
}

const getById = async(req,res,next)=>{
    const id = req.params.id
    let quote
    try{
        quote = await Quote.findById(id)
    }
    catch(err){
        return console.log(err)
    }
    if(!quote){
        return res.status(404).json({message:"No Quote Found"})
    }
    return res.status(200).json({quote})
}

const deleteQuote = async(req,res,next)=>{
    const id = req.params.id
    let quote
    try{
        quote = await Quote.findByIdAndRemove(id).populate('user') //search it
        await quote.user.quotes.pull(quote)
        await quote.user.save()
    }catch(err){
        return console.log(err)
    }
    if(!quote){
        return res.status(500).json({message:"Unable to Delete"})
    }
    return res.status(200).json({message:"Successfully Deleted"})
}

const getByUserId = async(req,res,next)=>{
    const userId = req.params.id
    let userQuotes
    try{
        userQuotes = await User.findById(userId).populate('quotes')
    }catch(err){
        return console.log(err)
    }
    if(!userQuotes){
        return res.status(404).json({message:"No Quotes Found"})
    }
    return res.status(200).json({user:userQuotes})
}

const getQuoteBycategoriesName = async(req,res,next)=>{
    const categories = req.params.categories
    let quote
    try{
        quote = await Quote.find(categories)
    }
    catch(err){
        return console.log(err)
    }
    if(!quote){
        return res.status(404).json({message:"No Quote Found"})
    }
    return res.status(200).json({quote})
}

module.exports = {
    getAllQuotes,
    addQuote,
    updateQuote,
    getById,
    deleteQuote,
    getByUserId,
    getQuoteBycategoriesName
}