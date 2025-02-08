const mongoose = require('mongoose');
const validator = require('validator')


const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
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
            if (!["male", "female", "others"].includes(value)) {
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


const User = mongoose.model("User", userSchema);


module.exports = User