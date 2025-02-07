const express = require('express');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');

app.use(express.json())

app.post('/signup', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save();
        res.send("Added Data in DB")
    } catch (error) {
        res.status(400).send("User not added: " + error.message)
    }
})

app.get('/user', async (req, res) => {
    const emailId = req.body.email;
    if (!emailId) {
        return res.status(400).send("Email ID is required");
    }
    try {
        const user = await User.findOne({ email: emailId })
        if (user) {
            res.send(user)
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
})

app.get('/feed', async (req, res) => {
    try {
        const users = await User.find({})
        res.json(users)
    } catch (error) {
        res.status(400).send("Something went wrong")
    }

})






connectDB().then(() => {
    console.log("DB connected")
    app.listen(3000)
}).catch((err) => {
    console.error("DB not connected")
})