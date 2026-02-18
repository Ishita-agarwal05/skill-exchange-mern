const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// 🔐 Auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// 🔹 GET MATCHES
router.get("/", authMiddleware, async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId);

    const allUsers = await User.find({
      _id: { $ne: req.userId }
    });

    // ✅ SAFE DEFAULTS
    const wantSkills = currentUser.skillsWant
      ? currentUser.skillsWant.toLowerCase().split(",").map(s => s.trim())
      : [];

    const connections = currentUser.connections || [];
    const requestsSent = currentUser.requestsSent || [];

    let matches = [];

    allUsers.forEach(otherUser => {
      const haveSkills = otherUser.skillsHave
        ? otherUser.skillsHave.toLowerCase().split(",").map(s => s.trim())
        : [];

      let score = 0;

      wantSkills.forEach(skill => {
        if (haveSkills.includes(skill)) {
          score++;
        }
      });

      if (score > 0) {
        let status = "connect";

        if (connections.some(id => id.toString() === otherUser._id.toString())) {
          status = "connected";
        } else if (
          requestsSent.some(id => id.toString() === otherUser._id.toString())
        ) {
          status = "pending";
        }

        matches.push({
          user: otherUser,
          score,
          status
        });
      }
    });

    // 🔽 Sort by best match
    matches.sort((a, b) => b.score - a.score);

    res.json(matches);
  } catch (error) {
    console.error("Match API error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
