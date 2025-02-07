const mongoose = require('mongoose');


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
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
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
        default: "photurl.png"
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