


//send otp

import UserModel from "../models/userSchema";

const sendOtp = async (req,res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
    try {
      // Save OTP to database
      await UserModel.updateOne({ email }, { $set: { otp } }, { upsert: true });
  
      // Send OTP via email
      await transporter.sendMail({
        from: 'your_email@gmail.com',
        to: email,
        subject: 'Verify Your Email Address',
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

    try {
      // Fetch OTP from database
      const user = await UserModel.findOne({ email });
  
      if (!user || user.otp !== otp) {
        return res.status(400).json({ error: 'Invalid OTP' });
      }
  
      // Update user's email verification status
      await UserModel.updateOne({ email }, { $set: { verified: true } });
  
      res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to verify OTP' });
    }
}