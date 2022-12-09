import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const addVideo =  async(req,res,next)=>{



    const newVideo =new Video ({userId : req.user.id, ...req.body})
    try{

        const savedVideo = await newVideo.save();
        res.status(200).json(newVideo)


    }
    catch(error){
        next(error)
    }


}

export const updateVideo =  async(req,res,next)=>{

   
    try{

        const video = await Video.findById(req.params.id)
        if(!video) return next(createError(404,"video not found"))
        if(req.user.id === video.userId)
        {
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id,
                
                {
                    $set:req.body,

                },
                {
                    new:true,
                });
                res.status(200).json("Updated Video")
        }
        else
        {
            return next(createError(403, "You can only update your video"));
        }

    }
    catch(error){
        next(error)
    }


}
export const deleteVideo =  async(req,res,next)=>{

    try{


        const video = await Video.findById(req.params.id)
        if(!video) return next(createError(404,"video not found"))
        if(req.user.id === video.userId)
        {
            await Video.findByIdAndDelete
            (req.params.id,
             );
                res.status(200).json("Video deleted")
        }
        else
        {
            return next(createError(403, "You can only delete your video"));
        }

    }
    catch(error){
        next(error)
    }



}
export const getVideo =  async(req,res,next)=>{

  
    try{


        const video = await Video.findById(req.params.id)
        res.status(200).json(video)

    }
    catch(error){
        next(error)
    }



}
export const addView =  async(req,res,next)=>{

  
    try{


        await Video.findByIdAndUpdate(req.params.id,{
            $inc: { views:1}
        })
        res.status(200).json("the view has been increased")

    }
    catch(error){
        next(error)
    }



}
export const random =  async(req,res,next)=>{

  
    try{

            // generating random video
            // mongoose function of aggreate
        const videos = await Video.aggregate([{ $sample:{ size:40 }}])
        res.status(200).json(videos)

    }
    catch(error){
        next(error)
    }



}
export const trend =  async(req,res,next)=>{

  
    try{

        // searching popular video according to their views
        // -1 for most views and 1 for less viewed video
        const videos = await Video.find().sort({ views:-1})
        res.status(200).json(videos)

    }
    catch(error){
        next(error)
    }



}
export const sub =  async(req,res,next)=>{

  
    try{


    const user = await User.findById(req.user.id)

    //data will be used from model section of video
    const subscribedChannels = user.subscribedUsers;


    //finds all the video
    const list =  await Promise.all()

    subscribedChannels.map((channelId)=>{
        return Video.find({ userId : channelId})

    })
    return res.status(200).json(list.flat().sort((a,b)=>b.createdAt - a.createdAt))

    }
    catch(error){
        next(error)
    }



}

export const getByTags =  async(req,res,next)=>{

    //split for giving gap between points also seprate them for putting them in array
    //searching tags by using query.tags
    const tags = req.query.tags.split(",")


  
    try{

        // $in is used for looking inside a array of tags
        // limit only upto 20 tags of a video
        const videos = await Video.find({tags:{$in: tags}}).limit(20);
        res.status(200).json(videos)

    }
    catch(error){
        next(error)
    }



}
export const search =  async(req,res,next)=>{
    const query = req.query.q
  
    try{

        // limiting for the search page
        // regrex for finding keywords of a title
        // i in options help in upper and lower case of a search keyword letter
        const videos = await Video.find({ title:{ $regex:query, $options:"i"}}).limit(40)
        res.status(200).json(videos)

    }
    catch(error){
        next(error)
    }



}
