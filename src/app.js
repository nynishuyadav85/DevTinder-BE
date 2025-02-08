const express = require('express');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');
const { ValidateSignUpData } = require('./utils/validation')
const bcrypt = require('bcrypt')

app.use(express.json())

app.post('/signup', async (req, res) => {
    try {
        ValidateSignUpData(req)
        const { firstName, lastName, email, password } = req.body
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashPassword
        })
        await user.save();
        res.send("Added Data in DB")
    } catch (error) {
        res.status(400).send("User not added: " + error.message)
    }
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        if (!user) {
            throw new Error("Email id  not Found")
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (isPasswordValid) {
            res.send("Logged In")
        } else {
            throw new Error("Password is not valid")
        }
    } catch (error) {
        res.status(400).send("Invalid UserName or Password " + error.message)
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

app.delete('/user', async (req, res) => {
    const emailId = req.body.email;

    try {
        console.log(emailId)
        await User.findOneAndDelete({ email: emailId })
        res.send("user Deleted")
    } catch (error) {
        res.status(400).send("Something went wrong")
    }
})

app.patch('/user/:userId', async (req, res) => {
    const userId = req.params.userId
    const data = req.body
    console.log(userId)

    try {
        const ALLOWED_UPDATES = [
            "age",
            "photoUrl",
            "about",
            "gender",
            "skills"
        ];
        const isUpdateAllowed = Object.keys(data).every((k) =>
            ALLOWED_UPDATES.includes(k)
        )
        console.log(isUpdateAllowed)
        if (!isUpdateAllowed) {
            throw new Error("Not Allowed")
        }
        const user = await User.findOneAndUpdate({ _id: userId }, data, {
            returnDocument: "after",
            runValidators: true
        })
        console.log(user)
        res.send("User Data updated")
    } catch (error) {
        res.status(400).send("Update failed: " + error.message)
    }
})





connectDB().then(() => {
    console.log("DB connected")
    app.listen(3000)
}).catch((err) => {
    console.error("DB not connected")
})