const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    caption:    { type: String, required: true },
    imageUrl:   { type: String, required: true },
    tags: [
                { type: String, required: false }
    ],
    location: {
        city:   { type: String, required: true },
        country:{ type: String, required: true },
        show:   { type: Boolean, required: true }
    },
    createdById:{ type: String, required: true },
    likedBy: [
                { type: String, required: true }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema, 'posts'); //tredje är vilken collection det gäller