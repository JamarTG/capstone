import { Request, RequestHandler, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";

export const register: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required." });
    return;
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: "User Already Exists" });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    if (!process.env.JWT_SECRET) {
      res.status(500).json({ message: "JWT_SECRET is not defined" });
      return;
    }
    if (!process.env.EXPIRY_TIME) {
      res.status(500).json({ message: "EXPIRY_TIME is not defined" });
      return;
    }

    const token = jwt.sign({ _id: newUser._id}, process.env.JWT_SECRET, { expiresIn: parseInt(process.env.EXPIRY_TIME) });
    res.status(201).json({ message: "User Created Successfully", token });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { email, password: plainTextPassword } = req.body;

  if (!email || !plainTextPassword) {
    res.status(400).json({ message: "Email and password are required." });
    return;
  }

  try {
    const userWithEmail = await User.findOne({ email });

    if (!userWithEmail) {
      res.status(404).json({ message: "User Not Found" });
      return;
    }

    const isPasswordCorrect = userWithEmail.comparePassword(plainTextPassword);

    if (!isPasswordCorrect) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ _id: userWithEmail._id }, process.env.JWT_SECRET!, { expiresIn: parseInt(process.env.EXPIRY_TIME!) });
    res.status(200).json({ message: "Login Successful", token });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
