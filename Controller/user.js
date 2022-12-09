import { createError } from "../error.js"
import User from "../models/User.js"
import Video from "../models/Video.js";




//updating user
 export const update = async(req,res,next)=>{
  
   
  if(req.params.id === req.user.id){
    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,{
            $set: req.body,
            
        }
        ,{
            new :true,
        })
        res.status(200).json(updatedUser);


    }
    catch(error){
        next(error)

    }

  }
  else{
    return next(createError(403,"You can only update your account"))
  }
}


//deleting users
export const deleteUser = async (req,res,next)=>{
  
     
  if(req.params.id === req.user.id){
    try{
        await User.findByIdAndDelete(
          req.params.id,
        );
        res.status(200).json("User has been deleted");


    }
    catch(error){
        next(error)

    }

  }
  else{
    return next(createError(403 ,"You can only delete or update your account"))
  }
}

//getting users
export const getUser = async(req,res,next)=>{

  try{

    const user = await User.findById(req.params.id)
    res.status(200).json(user)

  }
  catch(error){

  }

  
}


// subscribing users
export const subscribe = async (req,res,next)=>{

  

  try{
    await User.findByIdAndUpdate(req.user.id , {
      $push:{subscribedUsers:req.params.id
      },
    })
    await User.findByIdAndUpdate(req.params.id,{
      $inc:{subscriber:1},
    })
    res.status(200).json("You are now subscribed")

  }
  catch(error){
    
  }
  
}

//unsubscribing users
export const unsubscribe = async (req,res,next)=>{

  try{
    await User.findByIdAndUpdate(req.user.id , {
      $pull:{subscribedUsers:req.params.id
      }
    })
    await User.findByIdAndUpdate(req.params.id,{
      $inc:{subscriber: -1}
    })
    res.status(200).json("You are now unsubscribed")

  }
  catch(error){
    
  }
  
}


//liking a video
export const  like = async (req,res,next)=>{


  const id = req.user.id;
  const videoId = req.params.videoId;
  try{

    await Video.findByIdAndUpdate(videoId,{
      // prevent person from liking the video for more than one time
      $addToSet:{likes:id},
      $pull:{ dislikes:id}
    })
    res.status(200).json("Video has been liked")

  }
  catch(error){
    
  }
  
}


//disliking a video
export const dislike = async (req,res,next)=>{

  const id = req.user.id;
  const videoId = req.params.videoId;
  try{
    await Video.findByIdAndUpdate(videoId,{
      // prevent person from disliking the video for more than one time
      $addToSet:{dislikes:id},
      $pull:{ likes:id}
    })
    res.status(200).json("Video has been disliked")

  }
  catch(error){
    
  }
}
