const express = require('express');
const app = express();
const connectDB = require('./config/database');
const cookieparser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()
const http = require('http')

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieparser())

const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/request');
const { userRouter } = require('./routes/user');
const initlizeSocket = require('./utils/socket');

app.use('/', authRouter)
app.use('/', profileRouter)
app.use('/', requestRouter)
app.use('/', userRouter)

const server = http.createServer(app)
initlizeSocket(server)

connectDB().then(() => {
    console.log("DB connected")
    server.listen(process.env.PORT)
}).catch((err) => {
    console.error("DB not connected")
})