import express from "express";
import { addComment, deleteComment, getComment } from "../Controller/comment.js";
import { verifyToken } from "../verifyToken.js";


const router = express.Router();


// addding commment
router.post("/", verifyToken , addComment)

// deleting comment 
router.delete("/:id", verifyToken , deleteComment)

// getting comment of  a video
router.get("/:videoId", getComment)



export default router;