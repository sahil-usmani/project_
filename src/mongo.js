var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/signup')
.then(() => {
    console.log("Database is connected");
}).catch((err) => {
    console.log(err)
});

let userschema = mongoose.Schema({
    FullName:{
        type: String,
        required: true 
    },
    Email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

module.exports.users = mongoose.model("USMANI", userschema, "registered");