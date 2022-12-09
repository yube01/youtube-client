import express from "express";
import { signin, signup } from "../Controller/auth.js";


const router = express.Router();


//create a user
router.post("/signup", signup)

//sign in
router.post("/signin", signin)
//google auth
router.post("/google",)





export default router;