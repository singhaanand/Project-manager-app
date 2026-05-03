const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createProject,
  addMember,
  getProjects
} = require("../controllers/projectController");

router.post("/", auth, role("admin"), createProject);
router.get("/", auth, getProjects); // 👈 NEW
router.put("/:id/add-member", auth, role("admin"), addMember);

module.exports = router;