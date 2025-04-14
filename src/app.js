const express = require('express');
const app = express();
const connectDB = require('./config/database');
const cookieparser = require('cookie-parser')
app.use(express.json())
app.use(cookieparser())

const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/request');
const { userRouter } = require('./routes/user');

app.use('/', authRouter)
app.use('/', profileRouter)
app.use('/', requestRouter)
app.use('/', userRouter)

connectDB().then(() => {
    console.log("DB connected")
    app.listen(3000)
}).catch((err) => {
    console.error("DB not connected")
})