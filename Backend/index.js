const express = require("express")
const {connection} = require("./db")
require("dotenv").config() 
const {userRouter} = require("./routes/user.routes")
const {todoRouter} = require("./routes/todo.routes")
const {auth} = require("./middleware/auth.middleware")

const cors=require("cors")
const app = express()

app.use(express.json())
app.use(cors())


/////////////////////////
app.use("/users", userRouter)

app.use(auth)
app.use("/todos", todoRouter)

app.listen(process.env.port, async()=>{
    try {
        await connection
        // connection.disconnect
        console.log("Connected to Mongo")
    } catch (err) {
        console.log("Not connected to Mongo")
        console.log(err)
    }
    console.log('Server is running')
})