import { Response } from "express";
import { CustomRequest } from "../types/middleware";
import User from "../models/User";
import crypto from "crypto";

const updateUserInformation = async (req: CustomRequest, res: Response) => {
  const { password, email } = req.body;

  const _id = req.user._id;

  try {
    let dataToBeUpdated = {};

    if (email) {
      dataToBeUpdated = { ...dataToBeUpdated, email };
    }
    if (password) {
      const salt = crypto.randomBytes(16).toString("hex");
      const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");

      dataToBeUpdated = { ...dataToBeUpdated, password: hashedPassword, salt };
    }

    const updatedUser = await User.findByIdAndUpdate(_id, dataToBeUpdated, { new: true });

    if (!updatedUser) {
      res.status(404).json({ message: "User Not Found" });
      return;
    }

    updatedUser.save();

    res.status(200).json({ message: "User information updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { updateUserInformation };
