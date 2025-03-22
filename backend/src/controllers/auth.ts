import { Request, RequestHandler, Response } from "express";
import User from "../models/User";
import crypto from "crypto";

export const register: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "User Registration requires email and password" });
    return;
  }

  try {
    const userWithPassEmail = await User.findOne({ email });
    if (userWithPassEmail) {
      res.status(409).json({ message: "User Already Exists" });
      return;
    }

    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");

    const newUser = new User({ email, password: hash, salt });
    await newUser.save();
    res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    console.log("Something went wrong creating the user");
    res.status(500).json({ message: `Something Went Wrong Attempting to Create User${error}` });
  }
};

export const login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { email, password: plainTextPassword } = req.body;

  if (!email || !plainTextPassword) {
    res.status(404).json({ message: "Both password and Email must be provided" });
    return;
  }

  try {
    const userWithEmail = await User.findOne({ email });

    if (!userWithEmail) {
      res.status(404).json({ message: "User Not Found" });
      return;
    }

    const hash = crypto.pbkdf2Sync(plainTextPassword, userWithEmail.salt, 1000, 64, "sha512").toString("hex");

    if (hash != userWithEmail.password) {
      res.send(401).send({ message: "Invalid credentials" });
      return;
    }

    res.status(200).send({ message: "Login Successful" });
  } catch (error) {
    res.status(500).send({ message: "Server Error while attempting login" });
  }
};
