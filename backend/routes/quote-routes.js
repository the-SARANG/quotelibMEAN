const express = require('express')
const { getAllQuotes, addQuote, updateQuote, getById, deleteQuote, getByUserId, getQuoteByTopicName } = require('../controllers/quote-controller')
const quoteRouter = express.Router()

quoteRouter.get("/",getAllQuotes)
quoteRouter.post("/add",addQuote)
quoteRouter.put("/update/:id",updateQuote)
quoteRouter.get("/:id",getById)
quoteRouter.delete("/:id",deleteQuote)
quoteRouter.get("/user/:id",getByUserId)
//quoteRouter.get("/:topic",getQuoteByTopicName)

module.exports = quoteRouter