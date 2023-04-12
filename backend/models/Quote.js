const mongoose = require('mongoose')

const QuoteSchema = new mongoose.Schema({
    quote:{
        type: String,
        required: true
    },
    author:{
        type: String,
        default: 'Anonymous'
    },
    categories:{
        type: String
    },
    image:{
        type: String,
        //default: 'https://img.freepik.com/free-photo/pathway-middle-green-leafed-trees-with-sun-shining-through-branches_181624-4539.jpg?w=1480&t=st=1670219102~exp=1670219702~hmac=2e0ade686a64263628c2fd27117203888eb385d61c5fe5c58d117219d75a250d'
    },
    datetime:{
        type: Date,
        default: Date.now()
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User"

    }
})

const Quote = mongoose.model('Quote', QuoteSchema)

module.exports = Quote