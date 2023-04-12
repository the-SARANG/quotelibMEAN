const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    },
    password:{
        type: String,
        required: true,
        minlength: [6,'Password must be atleast 6 character long']
    },
    quotes:[{
        type: mongoose.Types.ObjectId,
        ref: "Quote"
    }]
})

// UserSchema.path('email').validate((val)=>{
//     emailRegex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//     return emailRegex.test(val)
// },'Invalid email')
const User = mongoose.model('User', UserSchema)

module.exports = User