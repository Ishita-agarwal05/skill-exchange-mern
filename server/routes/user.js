const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Auth middleware
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

// GET OWN PROFILE
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// GET USER PROFILE BY ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const profileUser = await User.findById(req.params.id).select("-password");
    if (!profileUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentUser = await User.findById(req.userId);

    const isConnected =
      currentUser.connections &&
      currentUser.connections.some(
        id => id.toString() === profileUser._id.toString()
      );

    res.json({
      ...profileUser._doc,
      isConnected
    });
  } catch (err) {
    console.error("Fetch profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
});




// UPDATE OWN PROFILE
router.put("/me", authMiddleware, async (req, res) => {
  try {
    const {
      bio,
      skillsHave,
      skillsWant,
      linkedin,
      contact
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      {
        bio,
        skillsHave,
        skillsWant,
        linkedin,
        contact
      },
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
