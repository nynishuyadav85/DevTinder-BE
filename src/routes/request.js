const express = require('express')
const requestRouter = express.Router();
const { userAuth } = require('../middleware/auth');


requestRouter.post('/sendConnectionrequest', userAuth, (req, res) => {
    const user = req.user
    console.log("Sending Connection request")
    res.send(user.firstName + "Sent a request")
})


module.exports = requestRouter