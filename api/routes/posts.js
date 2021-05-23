const express = require("express");
const router = express.Router();
const Post = require('../models/post');

const reqBody = (req) => ({
    caption:        req.body.caption,
    imageUrl:       req.body.imageUrl,
    tags:           req.body.tags,
    location:       req.body.location,
    createdById:    req.body.createdById,
    likedBy:        req.body.likedBy
});

//get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({createdAt:-1});
        res.send(posts);
    } catch (error) {
        res.send({ message: error });
    }
})

//get specific post
router.get('/:postId', async (req, res) => {
    try {
        res.send(
            await Post.findById(req.params.postId)
        )
    } catch (error) {
        res.send({ message: error });
    }
})

//create post
router.post('/', async (req, res) => {
    const post = new Post(reqBody(req));
    try {
        res.send(await post.save());
    } catch (error) {
        res.send({ message: error });
    }
})

//update post
router.patch('/:postId', async (req, res) => {
    try {
        res.send(
            await Post.updateOne(
                { _id:  req.params.postId },
                { $set: reqBody(req) }
            )
        )
    } catch (error) {
        res.send({ message: error });
    }
})

//delete post
router.delete('/:postId', async (req, res) => {
    try {
        res.send(
            await Post.deleteOne(
                { _id: req.params.postId }
            )
        )
    } catch (error) {
        res.send({ message: error });
    }
})


module.exports = router;