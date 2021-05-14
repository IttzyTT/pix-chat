const mongoose = require("mongoose");

const postMessageSchema = mongoose.Schema({
    content:    { type: String, required: true },
    postId:     { type: String, required: true },
    createdById:{ type: String, required: true },

}, { timestamps: true });

module.exports = mongoose.model("PostMessage", postMessageSchema, "postMessages");