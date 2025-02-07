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