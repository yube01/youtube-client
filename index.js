import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./Routes/users.js"
import authRoutes from "./Routes/auth.js"
import commentRoutes from "./Routes/comments.js"
import videoRoutes from "./Routes/videos.js"
import cookieParser from "cookie-parser";



const app = express()

// connecting to env file
dotenv.config()



// connecting to mongo db
const connect = ()=>{
    mongoose.connect(process.env.MONGO)
    .then(()=>{
        console.log("Database Connected")
    })
    .catch((error)=>{
        throw error;
    })

}

// middle ware
app.use(cookieParser())
app.use(express.json()) // sending json package to express
app.use("/api/auths",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/videos",videoRoutes)
app.use("/api/comments",commentRoutes)



// error middleware
app.use((error,req,res,next)=>{
    const status = error.status   || 500;
    const message = error.message   || "Something went wrong !!";
    return res.status(status).json({
        success:false,
        status,
        message
    })

});



// connecting to server
app.listen(2200,()=>{
    connect()
    console.log("Server connected")
})
