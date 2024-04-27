


//send otp

import UserModel from "../models/userSchema";

const sendOtp = async (req,res) => {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date();
    otpExpires.setMinutes(otpExpires.getMinutes() + 10); // OTP expires in 10 minutes

    try {
        // Update user's OTP and OTP expiration in the database
        await UserModel.updateOne({ email }, { $set: { otp, otpExpires } });

        // Send OTP via email using nodemailer
        const transporter = nodemailer.createTransport({
            // Configure your email service here
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'OTP Verification',
            text: `Your OTP for email verification is: ${otp}`,
        });

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send OTP' });
    }
}




//verify otp
const veridyOtp = async(req, res) => {
    const { email, otp } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    if (user.otp !== otp || user.otpExpires < new Date()) {
        return res.status(400).json({ error: 'Invalid OTP or OTP expired' });
    }

    try {
        // Mark the user's email as verified and clear OTP fields
        await UserModel.updateOne({ email }, { $set: { isEmailVerified: true, otp: null, otpExpires: null } });

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to verify email' });
    }
}