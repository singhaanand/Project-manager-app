const router = require("express").Router();

const { signup, login, getUsers } = require("../controllers/authController");

const auth = require("../middleware/authMiddleware");

// Auth routes
router.post("/signup", signup);
router.post("/login", login);

// 🔥 NEW: get all users (for dropdown)
router.get("/users", auth, getUsers);

module.exports = router;