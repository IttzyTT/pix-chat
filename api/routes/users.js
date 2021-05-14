const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Get all Users
router.get('/', async (req, res) => {
    try {
        res.send(await User.find());
    } catch (error) {
        console.log(error);
        res.send({ message: error });
    }
});

// Create User
router.post("/", async (req, res) => {
    
    const user = new User ({
        name:       req.body.name,
        password:   req.body.password,
        isLoggedIn: req.body.isLoggedIn   
    })
    try {
        res.send(await user.save());
    } catch (error) {
        res.send({ message: error });
    }
})

// Get specific User
router.get("/:userId", async (request, response) => {
    try {
        const user = await User.findById(request.params.userId);
        response.send(user);  
    } catch(error) {
        response.send({message: error});
    }
});

// Update User 
router.patch("/:userID", async (req, res) => {

    try{
        const updateUser = await User.updateOne(
            {_id: req.params.userID},
            {$set: {
                    name:       req.body.name,
                    password:   req.body.password,
                    isLoggedIn: req.body.isLoggedIn
                }
            }
        );
        response.send(updateUser);
    } catch (error) {
        res.send({message: error});
    }
});

// Delete User
router.delete("/:userId", async (req, res) => {
try {
    const deleteUser = await User.deleteOne(
        {_id: req.params.userId},
    );
    res.send(deleteUser);
} catch (error) {
    res.send({message: error});
}
    
});



module.exports = router;