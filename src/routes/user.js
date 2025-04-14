const express = require('express');
const ConnectionRequestModel = require('../models/connectionRequest');
const { userAuth } = require('../middleware/auth');
const userRouter = express.Router();

// get all the pending connection request for the logged in user
userRouter.get('/users/requests/received', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user

        const connectionRequests = await ConnectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: "intrested"
        })
        res.json({ message: "Data fetched successfully", data: connectionRequests })
    } catch (error) {
        res.status(400).send("ERROR: " + error.message)
    }
})

module.exports = {
    userRouter
}