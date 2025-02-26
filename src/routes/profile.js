const express = require('express')
const profileRouter = express.Router();
const { userAuth } = require('../middleware/auth');


profileRouter.get('/profile', userAuth, async (req, res) => {
    try {
        const user = req.user
        res.send({ message: "Cookie stored", user });
    } catch (error) {
        res.status(400).send("Error: " + error.message)
    }

})

profileRouter.patch('/profile/edit', (req, res) => {

})


module.exports = profileRouter