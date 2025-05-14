const mongoose = require('mongoose');
const validator = require('validator')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')


const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email: " + value)
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Invalid Email: " + value)
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if (!["Male", "male", "female", "Female", "others"].includes(value)) {
                throw new Error("Gender Data is not valid")
            }
        }
    },
    photoUrl: {
        type: String,
        default: "photurl.png",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid Email: " + value)
            }
        }
    },
    about: {
        type: String,
        default: "This is default about"
    },
    skills: {
        type: [String],
    }
}, {
    timeStamps: true
});

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, '123ABC', { expiresIn: "7d" })
    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash)
    return isPasswordValid
}

const User = mongoose.model("User", userSchema);


module.exports = User