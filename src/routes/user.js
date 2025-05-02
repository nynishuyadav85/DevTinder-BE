const express = require('express');
const ConnectionRequestModel = require('../models/connectionRequest');
const { userAuth } = require('../middleware/auth');
const User = require('../models/user');
const userRouter = express.Router();

// get all the pending connection request for the logged in user
userRouter.get('/users/requests/received', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user

        const connectionRequests = await ConnectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: "intrested"
        }).populate("fromUserId", ["firstName", "lastName", "age", "gender", "photoUrl", "about", "skills"])

        res.json({ message: "Data fetched successfully", data: connectionRequests })
    } catch (error) {
        res.status(400).send("ERROR: " + error.message)
    }
})

userRouter.get('/users/connections', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user
        const connectionRequests = await ConnectionRequestModel.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" },
            ]
        }).populate("fromUserId", ["firstName", "lastName", "age", "gender", "photoUrl", "about", "skills"])
            .populate("toUserId", ["firstName", "lastName", "age", "gender", "photoUrl", "about", "skills"])
        const data = connectionRequests.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId
            }
            return row.fromUserId
        })

        res.json({ message: "Data fetched successfully", data })
    } catch (error) {
        res.status(400).send("ERROR: " + error.message)
    }

})

userRouter.get('/feed', userAuth, async (req, res) => {

    try {
        const loggedInUser = req.user
        const skip = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const connectionRequest = await ConnectionRequestModel.find({
            $or: [
                { fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }
            ]
        }).select("fromUserId , toUserId")

        const hideFromUserFeed = new Set();

        connectionRequest.forEach((req) => {
            hideFromUserFeed.add(req.fromUserId.toString())
            hideFromUserFeed.add(req.toUserId.toString())
        })

        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideFromUserFeed) } },
                { _id: { $ne: loggedInUser._id } }
            ]
        }).select("firstName , lastName , age ,  gender , photoUrl , about , skills")?.skip(skip)?.limit(limit)
        res.send(users)

    } catch (error) {
        res.status(400).json({ message: "Error: " + error.message })
    }

})

module.exports = {
    userRouter
}