const [fs, path] = [require('fs'), require('path')];
const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    caption:    { type: String, required: true },
    imageUrl:   { type: String, required: true },
    tags: [
                { type: String, required: false }
    ],
    location: {
        city:   { type: String, required: false },
        country:{ type: String, required: false },
        show:   { type: Boolean, required: false }
    },
    createdById:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likedBy: [
                { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }
    ]
}, { timestamps: true });

postSchema.pre('save', function (next) {
    let [type, base64] = this.imageUrl.split(',');
    let extension = type.split('/')[1].split(';')[0];
    let buffer = Buffer.from(base64, 'base64');
    let fileName = `${this.createdById}_${Date.now()}.${extension}`;
    let filePath = path.join(
      __dirname, '../', '../', 'frontend', 'uploads', fileName
    );
    this.imageUrl = fileName;
    fs.writeFile(filePath, buffer, next);
});

module.exports = mongoose.model('Post', postSchema, 'posts'); //tredje är vilken collection det gäller