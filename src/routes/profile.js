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

profileRouter.patch('/profile/edit', userAuth, (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error("Invalid Edit Request")
        }

        const loggedInUser = req.user
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
        res.send(`${loggedInUser.firstName}, your Profile updated successfully`)
    } catch (error) {
        res.status(400).send("Error : + ")
    }
})


module.exports = profileRouter