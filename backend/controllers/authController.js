import UserModel from "../models/userSchema.js";
import bcrypt from "bcryptjs";

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
    });

    await userData.save();

    //storing id in session
    // req.session.user = { user: userData._id };

    //Taken out password fron rest of the content fron frontend
    // const { password: pass, ...rest } = userData._doc;


    const { password: pass, ...rest } = userData._doc;



    res.status(202).json({
      message: "User created Successfully",
      user:rest,
      success:true
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








export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const exisitingUser = await UserModel.findOne({ email: email });
    if (!exisitingUser) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }


    if(exisitingUser.role !== req.body.role) {
        return res.status(500).send({
            success: false,
            message: "role don't match",
        })    
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
      success:true
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
      if (err) {
        return console.log(err);
      }
  
    res.status(200).json({
      message: "User Logged Out Successfully"
    })
  })
  };
  