const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// 🔐 Auth Middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

//
// ─────────────────────────────────────────────
// SEND CONNECTION REQUEST
// ─────────────────────────────────────────────
//
router.post("/send/:id", authMiddleware, async (req, res) => {
  try {
    const receiverId = req.params.id;

    if (receiverId === req.userId) {
      return res
        .status(400)
        .json({ message: "Cannot send request to yourself" });
    }

    const sender = await User.findById(req.userId);
    const receiver = await User.findById(receiverId);

    if (!receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Prevent duplicates
    if (
      sender.requestsSent.includes(receiverId) ||
      sender.connections.includes(receiverId) ||
      receiver.requestsReceived.includes(req.userId)
    ) {
      return res
        .status(400)
        .json({ message: "Request already sent or connected" });
    }

    sender.requestsSent.push(receiverId);
    receiver.requestsReceived.push(req.userId);

    await sender.save();
    await receiver.save();

    res.json({ message: "Connection request sent" });
  } catch (err) {
    console.error("Send request error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//
// ─────────────────────────────────────────────
// ACCEPT CONNECTION REQUEST
// ─────────────────────────────────────────────
//
router.post("/accept/:id", authMiddleware, async (req, res) => {
  try {
    const senderId = req.params.id;

    const receiver = await User.findById(req.userId);
    const sender = await User.findById(senderId);

    if (!sender) {
      return res.status(404).json({ message: "User not found" });
    }

    receiver.requestsReceived = receiver.requestsReceived.filter(
      (id) => id.toString() !== senderId
    );
    sender.requestsSent = sender.requestsSent.filter(
      (id) => id.toString() !== req.userId
    );

    receiver.connections.push(senderId);
    sender.connections.push(req.userId);

    await receiver.save();
    await sender.save();

    res.json({ message: "Connection accepted" });
  } catch (err) {
    console.error("Accept request error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//
// ─────────────────────────────────────────────
// REJECT CONNECTION REQUEST
// ─────────────────────────────────────────────
//
router.post("/reject/:id", authMiddleware, async (req, res) => {
  try {
    const senderId = req.params.id;

    const receiver = await User.findById(req.userId);
    const sender = await User.findById(senderId);

    if (!sender) {
      return res.status(404).json({ message: "User not found" });
    }

    receiver.requestsReceived = receiver.requestsReceived.filter(
      (id) => id.toString() !== senderId
    );
    sender.requestsSent = sender.requestsSent.filter(
      (id) => id.toString() !== req.userId
    );

    await receiver.save();
    await sender.save();

    res.json({ message: "Connection rejected" });
  } catch (err) {
    console.error("Reject request error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET INCOMING CONNECTION REQUESTS
router.get("/requests", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate("requestsReceived", "name skillsHave skillsWant");

    res.json(user.requestsReceived);
  } catch (err) {
    console.error("Fetch requests error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET CONNECTED USERS
router.get("/list", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate("connections", "name skillsHave skillsWant");

    res.json(user.connections);
  } catch (err) {
    console.error("Fetch connections error:", err);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
