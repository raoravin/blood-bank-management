


//send otp

import UserModel from "../models/userSchema.js";

export const sendOtp = async (req,res) => {
    const { fullName, email, password } = req.body;
    try {
        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date();
        otpExpires.setMinutes(otpExpires.getMinutes() + 10); // OTP expires in 10 minutes

        // Save user with email verification fields
        const newUser = new UserModel({
            fullName,
            email,
            password,
            emailVerificationOTP: otp,
            emailVerificationOTPExpires: otpExpires
        });

        await newUser.save();

        // Send OTP via email
        const transporter = nodemailer.createTransport({
            // Configure nodemailer transporter here
        });

        await transporter.sendMail({
            from: 'your_email@gmail.com',
            to: email,
            subject: 'Email Verification OTP',
            text: `Your OTP for email verification is: ${otp}`,
        });

        res.status(200).json({ message: 'User registered successfully. Check your email for OTP.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Registration failed' });
    }
}




//verify otp
export const verifyOtp = async(req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (
            user.emailVerificationOTP !== otp ||
            user.emailVerificationOTPExpires < new Date() ||
            user.emailVerified
        ) {
            return res.status(400).json({ error: 'Invalid OTP or OTP expired' });
        }

        // Mark email as verified
        user.emailVerified = true;
        user.emailVerificationOTP = null;
        user.emailVerificationOTPExpires = null;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to verify email' });
    }
}


