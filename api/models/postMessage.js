const mongoose = require("mongoose");

const postMessageSchema = mongoose.Schema({
    content:    { type: String, required: true },
    postId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    createdById:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

}, { timestamps: true });

module.exports = mongoose.model("PostMessage", postMessageSchema, "postMessages");