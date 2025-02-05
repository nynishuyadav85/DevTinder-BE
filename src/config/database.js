const mongoose = require('mongoose')

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://nynishuyadav85:nishant15@cluster0.zkjov.mongodb.net/devTinder')
}

module.exports = connectDB

