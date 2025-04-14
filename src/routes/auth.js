const express = require('express')
const authRouter = express.Router()
const { ValidateSignUpData } = require('../utils/validation')
const User = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


authRouter.post('/signup', async (req, res) => {
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


authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        if (!user) {
            throw new Error("Email id  not Found")
        }
        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {
            const token = await user.getJWT()
            res.cookie('token', token, { expires: new Date(Date.now() + 8 * 3600000) })
            res.send(user)
        } else {
            throw new Error("Password is not valid")
        }
    } catch (error) {
        res.status(400).send("Invalid UserName or Password " + error.message)
    }

})

authRouter.post('/logout', (req, res) => {
    res.cookie('token', null, {
        expires: new Date(Date.now())
    })
    res.send("Logged Out")
})

module.exports = authRouter