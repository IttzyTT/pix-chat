const express = require("express");
const router = express.Router();
const PostMessage = require("../models/postMessage")

const reqBody = (req) => ({
    content:        req.body.content,
    postId:         req.body.postId,
    createdById:    req.body.createdById
});

// Get all postMessages
router.get('/', async (req, res) => {
    try{
        const postMessages = await PostMessage.find();
        res.send(postMessages)
    } catch (error) {
        res.send({ message: error })
    }
})

// Get specific postMessages
router.get("/:postMessageId", async (req, res) => {
    try {
        res.send(
            await PostMessage.findById(req.params.postMessageId)
        )
    } catch (error) {
        res.send({ message: error});     
    }
})

// Create postMessages
router.post('/', async (req, res) => {
    const postMessage = new PostMessage(reqBody(req));
    try {
        res.send(await postMessage.save());
    } catch (error) {
        res.send({ message: error })
    }
})

// Update postMessages
router.patch("/:postMessageId", async (req, res) => {
    try {
        res.send(
            await PostMessage.updateOne(
                { _id: req.params.postMessageId },
                { $set: reqBody(req) }
            )
        )
    } catch (error) {
        res.send({ message: error });
    }
})

// Delete postMessages
router.delete('/:postId', async (req, res) => {
    try {
        res.send(
            await PostMessage.deleteOne(
                { _id: req.params.postId }
            )
        )
    } catch (error) {
        res.send({ message: error });
    }
})

module.exports = router;