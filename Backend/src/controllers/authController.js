import userModel from "../models/userSchema.js";
import emailValidator from "email-validator";
import bcrypt from "bcrypt";
import { generateToken } from "../service/generateToken.js";
import jwt from "jsonwebtoken";

const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
//   console.log(fname, lname, email, password);

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      sucess: false,
      message: "every feild is required",
    });
  }

  //emial-validator

  const validEmail = emailValidator.validate(email);

  if (!validEmail) {
    return res.status(400).json({
      status: false,
      message: "Invalid email Format",
    });
  }

  // bcrypt password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const userInfo = userModel({
      ...req.body,
      password: hashedPassword,
    });
    const result = await userInfo.save();
    // console.log(result,"result");
    const user = await userModel.findOne({ email });
    const token = generateToken(user._id);

    const cookieOption = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    };
    if(result){
        
        res.cookie("token", token, cookieOption);
     return res.status(200).json({
      sucess:true,
      data:result
     })

    }
    
  } catch (error) {
    if (error.code === 1100) {
      return res.status(400).json({
        sucess: false,
        message: "Account already exist",
      });
    }
    return res.status(400).json({
      sucess: false,
      message: error.message,
    });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      sucess: false,
      message: "All feild are required",
    });
  }

  try {
    const user = await userModel.findOne({ email:email }).select("+password");
    console.log(user, "user");

    if (!user) {
      return res.status(400).json({
        sucess: false,
        message: "User not found",
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({
        sucess: false,
        message: "Invalid Credentials",
      });
    }

    const token = generateToken(user._id);
    // console.log(token, "token");

    //cookie
    const cookieOption = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    };
    user.password = undefined;

    res.cookie("token", token, cookieOption);
    res.status(200).json({
      sucess: true,
      message: "User login sucessfully",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      message: error.message,
    });
  }
};

const logout = (req, res) => {
  // const decode = jwt.decode(token)
  res.clearCookie("token");

  res.status(200).json({
    sucess: true,
    message: "logout",
  });
};

export default { signIn, signUp, logout };
