const express = require('express');
const app = express();
const connectDB = require('./config/database')

app.get('/user', (req, res) => {
    res.send("Hello")
})

connectDB().then(() => {
    console.log("DB connected")
    app.listen(3000)
}).catch((err) => {
    console.error("DB not connected")
})