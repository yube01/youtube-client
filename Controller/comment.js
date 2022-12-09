import { createError } from "../error.js"
import Comment from "../models/Comment.js"
import Video from "../models/Video.js"


export const addComment = async (req,res,next) =>{
    const newComment = new Comment({...req.body, userId:req.user.id})
    try{


        const savedComment = await newComment.save()
        res.status(200).send(savedComment)

      
    }
    catch(error){
        next(error)
    }
}

export const deleteComment = async (req,res,next) =>{
    try{
        const comment = await Comment.findById(res.params.id)
        const video = await Video.findById(res.params.id)
        // if comment owner and 
        // video owner is true then
        if(req.user.id === comment.user.id || req.user.id === video.user.id){
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json("The comment has been deleted !!")

        }
        else{
            next(createError(403," You can only delete your comment"))
        }

    }
    catch(error){
        next(error)
    }
}

export const getComment = async (req,res,next) =>{
    try{
        const comments = await Comment.find({videoId: req.params.videoId})
        res.status(200).json(comments)

    }
    catch(error){
        next(error)
    }
}