import { Request, Response, NextFunction } from "express";
import { verify,  JwtPayload} from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: string | JwtPayload;
}

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "Access Denied" });
    return;
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT Secret Missing");
    }

    const tokenParts = token.split(" ");

    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      res.status(400).json({ message: "Invalid Token Format" });
      return;
    }

    const user = verify(tokenParts[1], process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: `Server Error` });
  }
};

export { verifyToken };
