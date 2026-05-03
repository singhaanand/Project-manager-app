const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware"); // 👈 add this

const {
  createTask,
  updateStatus,
  getTasks
} = require("../controllers/taskController");

// 👑 ONLY ADMIN can create task
router.post("/", auth, role("admin"), createTask);

// 👤 both can view (but filtered by user)
router.get("/", auth, getTasks);

// 👤 assigned user can update
router.put("/:id/status", auth, updateStatus);

module.exports = router;