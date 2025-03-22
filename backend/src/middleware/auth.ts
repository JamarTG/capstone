import { Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { CustomRequest } from "../types/middleware";

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT Secret Missing");
    }

    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(400).json({ message: "Invalid Token Format" });
    }

    const user = verify(tokenParts[1], process.env.JWT_SECRET as string);
    req.user = user; 
    next(); 
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};


export { verifyToken };
