const validator = require('validator')


const ValidateSignUpData = (req) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error("Name is not valid")
    } else if (!validator.isEmail(email)) {
        throw new Error("Email is not valid")
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not valid")
    }
}

module.exports = {
    ValidateSignUpData,
}