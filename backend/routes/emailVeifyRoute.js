
import express from "express";
import { sendOtp, verifyOtp } from "../controllers/emailVeification.js";


const router = express.Router();

router.post("/send-otp",sendOtp );
router.post("verify-email",verifyOtp);


export default router;