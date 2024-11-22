import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
dotenv.config()

export const home = async (req, res) => {
  try {
    res.status(200).send("Welcome");
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

// Registration
export const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    if (!username || !email || !phone || !password) {
      return res.status(400).send({ msg: "All fields are required" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).send({ msg: "Email already exists" });
    }

    const hash_password = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      phone,
      password: hash_password,
    });

    res.status(200).send({
      msg: "success",
      value:newUser,
      token: await newUser.generateToken(),
      userId: newUser._id.toString(),
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ msg: "Email and password are required" });
    }

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).send({ msg: "Invalid email" });
    }

    const isMatched = await bcrypt.compare(password, userExist.password);
    if (isMatched) {
      res.status(200).send({
        msg: "success",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(400).send({ msg: "Invalid email and password" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};
export const user = async (req, res) => {
  try {
    const userData = req.user; // Extract user data from request
    console.log("Controller: User from Middleware:", userData); // Debug log

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send user data as JSON response
    return res.status(200).json({ userData });
  } catch (error) {
    console.error("Controller: Error occurred:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
