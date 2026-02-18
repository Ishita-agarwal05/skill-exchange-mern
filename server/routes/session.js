const express = require("express");
const jwt = require("jsonwebtoken");
const Session = require("../models/Session");
const User = require("../models/User");

const router = express.Router();

// 🔐 Auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ─────────────────────────────
// CREATE (PROPOSE) SESSION
// ─────────────────────────────
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const {
      otherUserId,
      skillOffered,
      skillRequested,
      date,
      time,
      medium
    } = req.body;

    const currentUser = await User.findById(req.userId);

    // ✅ Allow only connected users
    const isConnected = currentUser.connections.some(
      id => id.toString() === otherUserId
    );

    if (!isConnected) {
      return res.status(403).json({ message: "Not connected" });
    }

    const session = await Session.create({
      teacher: req.userId,
      learner: otherUserId,
      skillOffered,
      skillRequested,
      date,
      time,
      medium
    });

    res.json(session);
  } catch (err) {
    console.error("Create session error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ─────────────────────────────
// GET MY SESSIONS
// ─────────────────────────────
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const sessions = await Session.find({
      $or: [{ teacher: req.userId }, { learner: req.userId }]
    })
      .populate("teacher", "name")
      .populate("learner", "name")
      .sort({ createdAt: -1 });

    res.json(sessions);
  } catch (err) {
    console.error("Fetch sessions error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ─────────────────────────────
// ACCEPT SESSION
// ─────────────────────────────
router.post("/accept/:id", authMiddleware, async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Only learner can accept
    if (session.learner.toString() !== req.userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    session.status = "accepted";
    await session.save();

    res.json(session);
  } catch (err) {
    console.error("Accept session error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
