import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const Register = async (req, res) => {
    console.log(req.body)
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(401).json({
        success: false,
        message: "invalid data",
      });
    }
    const user = await User.findOne({
      email,
    });
    if (user) {
      return res.status(401).json({
        success: false,
        message: "this email is already taken",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);
    console.log("siva")
    await User.create({
      username,
      email,
      password: hashed_password,
    });
    res.status(200).json({
      success: true,
      message: "Your Account Created/Registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "invalid submission",
      });
    }
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "this email is not valid/registered",
      });
    }
    const matching_password = await bcrypt.compare(password, user.password);
    if (!matching_password) {
      return res.status(400).json({
        success: false,
        message: "password is not valid",
      });
    }
    const token_data = { id: user._id };
    const token = await jwt.sign(token_data, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    return res.status(200).cookie("token", token, { httpOnly: true }).json({
      success: true,
      message: "logged in Successfully",
      user: user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const Logout = async (req, res) => {
  return res
    .status(200)
    .cookie("token", "", { expires: new Date(0), httpOnly: true })
    .json({
      message: "User Logged Out Successfully",
      success: true,
    });
};
