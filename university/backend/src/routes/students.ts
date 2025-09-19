import { Router } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { authenticate } from "../middleware/auth";

const router = Router();

// robust Student loading (existing guard)
let Student: any;
try {
  const mod = require("../models/Student");
  Student = mod && (mod.default || mod.Student || mod);
} catch {
  // ignore
}

// middleware to ensure model is loaded
router.use((req, res, next) => {
  if (!Student || typeof Student.findOne !== "function") {
    Student = (mongoose.models && (mongoose.models as any).Student) || undefined;
  }
  if (!Student || typeof Student.findOne !== "function") {
    console.error("Student model is not loaded (routes/students).");
    return res.status(500).json({ message: "Server misconfigured: Student model not loaded" });
  }
  next();
});

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false, // set to true in production with HTTPS
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/',
};

// POST /api/students/register  (existing)
router.post("/register", async (req, res) => {
  try {
    const rollInput = req.body.rollNo || req.body.rollNumber;
    const name = req.body.name;
    const password = req.body.password;
    const department = req.body.department;
    const exists = await Student.findOne({
      $or: [{ rollNo: rollInput }, { rollNumber: rollInput }],
    });
    if (exists) return res.status(400).json({ message: "Roll number already exists" });
    const student = await Student.create({
      rollNo: rollInput,
      rollNumber: rollInput,
      name,
      password,
      department,
    });
    const out = student.toObject();
    delete out.password;
    res.status(201).json(out);
  } catch (err) {
    console.error("POST /api/students/register error:", err);
    res.status(500).json({
      message: "Server error",
      error: process.env.NODE_ENV !== "production" ? (err instanceof Error ? err.stack : String(err)) : undefined,
    });
  }
});

// POST /api/students/login -> issue JWT cookie
router.post("/login", async (req, res) => {
  try {
    const rollInput = req.body.rollNo || req.body.rollNumber;
    const password = req.body.password;
    if (!rollInput || !password) return res.status(400).json({ message: "Missing credentials" });

    const student = await Student.findOne({
      $or: [{ rollNo: rollInput }, { rollNumber: rollInput }],
    }).lean();
    if (!student) return res.status(401).json({ message: "Invalid credentials" });

    const full = await Student.findById(student._id);
    const ok = full && (await full.comparePassword(password));
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: full._id.toString() }, JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, COOKIE_OPTIONS);
    const out = full.toObject();
    delete out.password;
    res.json(out);
  } catch (err) {
    console.error("POST /api/students/login error:", err);
    res.status(500).json({
      message: "Server error",
      error: process.env.NODE_ENV !== "production" ? (err instanceof Error ? err.stack : String(err)) : undefined,
    });
  }
});

// GET /api/students/me -> authenticated
router.get("/me", authenticate, async (req: any, res) => {
  if (!req.user) return res.status(404).json({ message: "Not found" });
  res.json(req.user);
});

// POST /api/students/logout -> clear cookie
router.post("/logout", (_req, res) => {
  res.clearCookie('token', { path: '/' });
  res.json({ ok: true });
});

// GET /api/students/:rollNo  (public)
router.get("/:rollNo", async (req, res) => {
  try {
    const rollParam = req.params.rollNo;
    const student = await Student.findOne({
      $or: [{ rollNo: rollParam }, { rollNumber: rollParam }],
    }).lean();
    if (!student) return res.status(404).json({ message: "Not found" });
    delete (student as any).password;
    res.json(student);
  } catch (err) {
    console.error("GET /api/students/:rollNo error:", err);
    res.status(500).json({
      message: "Server error",
      error: process.env.NODE_ENV !== "production" ? (err instanceof Error ? err.stack : String(err)) : undefined,
    });
  }
});

export default router;
