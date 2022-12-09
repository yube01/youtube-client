import mongoose from "mongoose"
import User from "../models/User.js"
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
// npm add jsonwebtoken
import jwt from "jsonwebtoken";




export const signup =async (req,res ,next)=>{
   
    
    try{
        const salt = bcrypt.genSaltSync(10);
        // encrypting the password
        // npm add bcryptjs
        const hash = bcrypt.hashSync(req.body.password,salt);
        const newUser = new User ({...req.body , password:hash});

    // saving data to mongodb
     await newUser.save()
     res.status(200).send("User has been created!!")
    }
    catch(error){
        next(error)

    }

}

export const signin =async (req,res ,next)=>{
   
    
    try{

        // finding user name in database
    const user = await User.findOne({name:req.body.name})
    if(!user) return next(createError(404, "User hasn't signup so please sign up"))


    // matching password with user name which is already stored in database
    const correctPassword = await bcrypt.compare(req.body.password, user.password)
    if(!correctPassword) return next(createError(400,"Password incorrect"))

    const token = jwt.sign({id:user._id},process.env.JWT);

    //preventing the access of hashed password
    const{password, ...others} = user._doc;

    // for security purpose
    //npm add cookie-parser for adding  cookie library
    res.cookie("access_token",token,{
        httpOnly: true

    }).status(200)
      .json(others)


    }
    catch(error){
        next(error)

    }

}