const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load env variables
dotenv.config();

// Connect DB
connectDB();

const app = express();

// ✅ CORS
app.use(cors({
  origin: "http://localhost:3000"
}));

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

// Custom Middleware
const auth = require("./middleware/authMiddleware");
const role = require("./middleware/roleMiddleware");

// Test route
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// Protected routes
app.get("/admin", auth, role("admin"), (req, res) => {
  res.send("Welcome Admin");
});

app.get("/user", auth, (req, res) => {
  res.send("Welcome User");
});

// Server start (ALWAYS LAST)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});