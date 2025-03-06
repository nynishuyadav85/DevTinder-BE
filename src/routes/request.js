const express = require('express')
const requestRouter = express.Router();
const { userAuth } = require('../middleware/auth');
const ConnectionRequestModel = require('../models/connectionRequest');


requestRouter.post('/request/send/:status/:toUserId', userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id
        const toUserId = req.params.toUserId
        const status = req.params.status

        const allowedStatus = ["intrested", "ignored"]
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid Status Type " + status })
        }
        // if there is existing connecting request
        const existingConnectionRequest = await ConnectionRequestModel.findOne({
            $or: [{ fromUserId, toUserId }, { toUserId: fromUserId, fromUserId: toUserId }]
        })
        if (existingConnectionRequest) {
            return res.status(400).json({ message: "Connection request already exist" })
        }
        const connectionRequest = new ConnectionRequestModel({
            fromUserId,
            toUserId,
            status
        })

        const data = await connectionRequest.save();
        res.json({
            message: "Connection Request sent successfully",
            data
        })
    } catch (error) {
        res.status(400).send("Error" + error.message)
    }
})


module.exports = requestRouter