const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');

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

    const plainTextPassword = req.body.password;
    const saltRounds = 10;

    try {
        const hash = await bcrypt.hash(plainTextPassword, saltRounds);
        
        const user = new User ({
            name:       req.body.name,
            password:   hash,
            isLoggedIn: true   
        })
        res.send(await user.save());
    } catch (error) {
        res.send({ message: error });
        console.log(error);
    }
})

// Login / Compare passwords
router.get("/login/:name%26:password", async (request, response) => {

    const inputPassword = request.params.password;

    try {
        const user = await User.findOne({ name: request.params.name });
        const match = await bcrypt.compare(inputPassword, user.password);
        const resObject = {
            isMatch: match,
            ...user
        }
        response.send(JSON.stringify(resObject));  
    } catch(error) {
        response.send({message: error});
    }
});

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
    
    const plainTextPassword = req.body.password;
    const saltRounds = 10;

    try {
        const hash = await bcrypt.hash(plainTextPassword, saltRounds);
        
        const updateUser = await User.updateOne(
            {_id: req.params.userID},
            {$set: {
                    name:       req.body.name,
                    password:   hash,
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