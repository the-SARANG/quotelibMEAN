const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
//import router from './routes/user-routes'

const route = require('./routes/user-routes')
const quoteRouter = require('./routes/quote-routes')
const cors = require('cors')
const app = express()
// app.use(cors())
//cors cross origin request security
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE")
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept") //Search it
    next() //search it
})
app.use(express.json())
app.use('/api',route)
app.use('/quote',quoteRouter)

//sIvEGdKynvE1AC9U
mongoose.connect("mongodb+srv://admin:sIvEGdKynvE1AC9U@cluster0.3indntk.mongodb.net/QuoteLib?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>app.listen(3000))
    .then(()=>console.log("DB Connected and running on 3000"))
    .catch((err)=>console.log(err))





// const mongoose = require('./database/mongoose')

// const Quote = require('./database/models/quotes')
// const User = require('./database/models/user')





// app.get('/quotes',(req,res)=>{
//     Quote.find({})
//         .then(quotes=>res.send(quotes))
//         .catch((err)=>console.log(err))
// })

// app.post('/quotes', (req,res)=>{
//     (new Quote({
//         "quote": req.body.quote,
//         "writer": req.body.writer.toLowerCase(),
//         "topic": req.body.topic.toLowerCase()
//      }))
//         .save()
//         .then((quotes)=>res.send(quotes))
//         .catch((err)=>console.log(err))
// })

// app.get('/quotes/:topic',(req,res)=>{
//     Quote.find({"topic": req.params.topic})
//         .then((quotes)=>res.send(quotes))
//         .catch((err)=>console.log(err))
// })

// app.patch('/quotes/:topic',(req,res)=>{
//     Quote.findOneAndUpdate({"topic": req.params.topic}, {$set: req.body})
//         .then((quotes)=>res.send(quotes))
//         .catch((err)=>console.log(err))
// })

// // app.get('/quotes/:writer',(req,res)=>{
// //     Quote.find({"writer": req.params.writer})
// //         .then((quotes)=>res.send(quotes))
// //         .catch((err)=>console.log(err))
// // })

// app.patch('/quotes/:topic/:writer',(req,res)=>{
//     Quote.findOneAndUpdate({"writer": req.params.writer}, {$set: req.body})
//         .then((quotes)=>res.send(quotes))
//         .catch((err)=>console.log(err))
// })


// // app.delete('/quotes/:topic',(req,res)=>{
// //     Quote.findOneAndDelete({"topic": req.params.body})
// //         .then((quotes)=>res.send(quotes))
// //         .catch((err)=>console.log(err))
// // })

// app.delete('/quotes/:topic/:writer',(req,res)=>{
//     const deleteQuote = (quotes)=>{
//         Quote.deleteMany({"writer": req.params.body})
//             .then(()=>quotes)
//             .catch((err)=>console.log(err))
//     }
//     const quote = Quote.findOneAndDelete(req.params.writer)
//         .then((quote)=>res.send(deleteQuote(quote)))
//         .catch((err)=>console.log(err))
// })
// app.listen(3000, ()=>{
//     console.log("Server connected on 3000")
// })

