import { Response } from "express";
import { CustomRequest } from "../types/middleware";
import User from "../models/User";
import crypto from "crypto";

const getUserInformation = async (req: CustomRequest, res: Response) => {
  const { _id } = req.user;

  try {
    const user = await User.findById({ _id });

    if (!user) {
      res.status(404).json({ message: "User Not Found" });
      return;
    }
    res.status(200).json({
      message: "Successfully fetched user information",
      data: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error}` });
    return;
  }
};

const updateUserInformation = async (req: CustomRequest, res: Response) => {
  const { password, email, firstName, lastName, currentPassword } = req.body;
  const { _id } = req.user;

  try {
    const user = await User.findById(_id).select("+password +salt");;
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
      return;
    }

    let dataToBeUpdated = {};

    if (email) dataToBeUpdated = { ...dataToBeUpdated, email };
    if (firstName) dataToBeUpdated = { ...dataToBeUpdated, firstName };
    if (lastName) dataToBeUpdated = { ...dataToBeUpdated, lastName };

    if (password) {
      if (!currentPassword) {
        res.status(400).json({ message: "Current password is required to change password" });
        return;
      }

      const isPasswordCorrect = user.comparePassword(currentPassword)
      if (!isPasswordCorrect) {
        res.status(403).json({ message: "Current password is incorrect" });
        return;
      }

      const newSalt = crypto.randomBytes(16).toString("hex");
      const newHashedPassword = crypto
        .pbkdf2Sync(password, newSalt, 1000, 64, "sha512")
        .toString("hex");

      dataToBeUpdated = {
        ...dataToBeUpdated,
        password: newHashedPassword,
        salt: newSalt,
      };
    }

    const updatedUser = await User.findByIdAndUpdate(_id, dataToBeUpdated, { new: true });
    await updatedUser?.save();

    res.status(200).json({ message: "User information updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { updateUserInformation, getUserInformation };
