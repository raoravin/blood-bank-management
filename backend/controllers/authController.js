import UserModel from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export const register = async (req, res) => {
  const {
    email,
    password,
    fullName,
    role,
    organisationName,
    hospitalName,
    website,
    address,
    phone,
  } = req.body;

  try {
    const exisitingUser = await UserModel.findOne({ email });

    //check if user already exists or not
    if (exisitingUser) {
      return res.status(400).json({
        message: "User Already Exists",
      });
    }

    // Generate OTP
    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date();
    otpExpires.setMinutes(otpExpires.getMinutes() + 10); // OTP expires in 3 minutes

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const userData = new UserModel({
      fullName,
      email,
      password: hashPassword,
      role,
      organisationName,
      hospitalName,
      website,
      address,
      phone,
      emailVerificationOTP: generatedOTP,
      emailVerificationOTPExpires: otpExpires,
    });

    await userData.save();

    // storing id in session
    req.session.user = { user: userData._id };

    //Taken out password fron rest of the content fron frontend
    // const { password: pass, ...rest } = userData._doc;

    const { password: pass, ...rest } = userData._doc;

    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Account verification",
      text: `Bhosadike OTP bta: ${generatedOTP}`,
    });

    res.status(202).json({
      message: "User created Successfully",
      user: rest,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Register",
      error,
    });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (
      user.emailVerificationOTP !== otp ||
      user.emailVerificationOTPExpires < new Date()
    ) {
      return res.status(400).json({ error: "Invalid OTP or OTP expired" });
    }

    // Mark email as verified
    user.emailVerified = true;
    user.emailVerificationOTP = null;
    user.emailVerificationOTPExpires = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to verify email" });
  }
};

export const login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const exisitingUser = await UserModel.findOne({ email: email });
    if (!exisitingUser) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    if (exisitingUser.role !== role) {
      return res.status(500).send({
        success: false,
        message: "role don't match",
      });
    }

    //Compare Password
    const isMatch = await bcrypt.compare(password, exisitingUser.password);

    if (!isMatch) {
      return res.status(404).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    // storing session
    req.session.user = { user: exisitingUser._id };

    const { password: pass, ...rest } = exisitingUser._doc;

    res.status(200).json({
      message: "User Login Successfull",
      user: rest,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Login",
      error,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user);

    if (!user) {
      return res.status(404).send({
        message: "User Not Found",
      });
    }

    const { password: pass, ...rest } = user._doc;

    return res.status(200).json({
      success: true,
      message: "User found",
      user: rest,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Login",
      error,
    });
  }
};

export const logout = async (req, res) => {
  // res.clearCookie("todo");
  req.session.destroy((err) => {
    res.clearCookie("blood_bank", { path: "/" });
    if (err) {
      return console.log(err);
    }

    res.status(200).json({
      message: "User Logout ",
    });
  });
};
