require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const matchRoutes = require("./routes/match");
const connectionRoutes = require("./routes/connection");
const sessionRoutes = require("./routes/session");



const app = express();   // ✅ app FIRST

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/match", matchRoutes);  // ✅ app used AFTER initialization
app.use("/api/users", userRoutes);
app.use("/api/connections", connectionRoutes);
app.use("/api/sessions", sessionRoutes);




mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
