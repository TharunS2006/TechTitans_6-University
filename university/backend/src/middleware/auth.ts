import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export interface AuthRequest extends Request {
  userId?: string;
  user?: any;
}

export async function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.token || (req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization?.split(" ")[1] : undefined);
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const payload = jwt.verify(token, JWT_SECRET) as any;
    const userId = payload?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    req.userId = userId;
    // load user document if needed
    const Student = (mongoose.models as any).Student;
    if (Student) {
      req.user = await Student.findById(userId).lean();
      if (req.user) delete req.user.password;
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
