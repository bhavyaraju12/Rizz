import express from "express"
import { signIn, signOut, signUp,sendOtp, verifyOtp, resetPassword  } from "../controllers/auth.controllers.js"

const authRouter=express.Router()

authRouter.post("/signup",signUp)
authRouter.post("/signin",signIn)

authRouter.post("/sendOtp",sendOtp)
authRouter.post("/verifyOtp",verifyOtp)
authRouter.post("/resetPassword",resetPassword)
authRouter.post("/signout",signOut)


export default authRouter