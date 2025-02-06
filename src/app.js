const express = require('express');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');

app.post('/signup', async (req, res) => {
    const user = new User({
        firstName: "Nishant",
        lastName: "yadav",
        email: "ny@y.com",
        password: "ny123",
        age: 25
    })

    try {
        await user.save();
        res.send("Added Data in DB")
    } catch (error) {
        res.status(400).send("User not added: " + error.message)
    }
})

connectDB().then(() => {
    console.log("DB connected")
    app.listen(3000)
}).catch((err) => {
    console.error("DB not connected")
})