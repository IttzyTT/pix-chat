const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:       {  type: String, required: true },
    password:   {  type: String, required: true },
    isLoggedIn:   {  type: Boolean, required: false }
})

module.exports = mongoose.model('User', userSchema, "users"); //tredje är vilken collection det gäller