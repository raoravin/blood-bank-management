
import express from "express";
import { sendOtp, verifyOtp } from "../controllers/emailVeification";


const router = express.Router();

router.post("/send-otp",sendOtp );
router.post("verify-email",verifyOtp);


export default router;