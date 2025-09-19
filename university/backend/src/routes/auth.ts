import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const router = Router();

// robustly load Student model (handles different module shapes)
let Student: any;
try {
  const mod = require("../models/Student");
  Student = mod && (mod.default || mod.Student || mod);
} catch {
  // ignore
}
if (!Student) {
  Student = (mongoose.models && (mongoose.models as any).Student) || undefined;
}

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

// POST /api/auth/login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const rollInput = req.body.rollNumber || req.body.rollNo || req.body.rollNumber;
    const password = req.body.password;
    if (!rollInput || !password) return res.status(400).json({ message: "Missing credentials" });

    const student = await Student.findOne({
      $or: [{ rollNo: rollInput }, { rollNumber: rollInput }],
    }).lean();
    if (!student) return res.status(401).json({ message: "Invalid credentials" });

    const full = await Student.findById(student._id);
    const ok = full && (await full.comparePassword(password));
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: full._id.toString() }, JWT_SECRET, { expiresIn: "7d" });
    const out = full.toObject();
    delete out.password;
    res.json({ token, user: out });
  } catch (err) {
    console.error("POST /api/auth/login error:", err);
    res.status(500).json({ message: "Server error", error: process.env.NODE_ENV !== "production" ? (err instanceof Error ? err.stack : String(err)) : undefined });
  }
});

// GET /api/auth/me
router.get("/me", async (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) return res.status(401).json({ message: "Missing token" });
    const token = auth.split(" ")[1];
    let payload: any;
    try {
      payload = jwt.verify(token, JWT_SECRET) as any;
    } catch {
      return res.status(401).json({ message: "Invalid token" });
    }
    const userId = payload?.id;
    if (!userId) return res.status(401).json({ message: "Invalid token" });
    const user = await Student.findById(userId).lean();
    if (!user) return res.status(404).json({ message: "Not found" });
    delete (user as any).password;
    res.json(user);
  } catch (err) {
    console.error("GET /api/auth/me error:", err);
    res.status(500).json({ message: "Server error", error: process.env.NODE_ENV !== "production" ? (err instanceof Error ? err.stack : String(err)) : undefined });
  }
});

export default router;
