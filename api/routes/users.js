const express = require("express");
const router = express.Router();
const User = require("../models/user");

//get all users
router.get('/', async (req, res) => {
    try {
        res.send(await User.find());
    } catch (error) {
        console.log(error);
        res.send({ message: error });
    }
});

module.exports = router;