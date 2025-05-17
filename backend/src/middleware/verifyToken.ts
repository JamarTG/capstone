import { Response, NextFunction } from "express";
import { verify, JwtPayload } from "jsonwebtoken";
import { CustomRequest } from "../types/middleware";

const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "Access Denied" });
    return;
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT Secret Missing");
    }

    const user = verify(token, process.env.JWT_SECRET) as JwtPayload;
    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid Token" });
  }
};

export default verifyToken;
