const Task = require("../models/Task");

// Dashboard Stats
exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    let total, completed, pending, overdue;

    // 👑 ADMIN → ALL TASKS
    if (role === "admin") {
      total = await Task.countDocuments();

      completed = await Task.countDocuments({
        status: "done"
      });

      pending = await Task.countDocuments({
        status: { $ne: "done" }
      });

      overdue = await Task.countDocuments({
        deadline: { $lt: new Date() },
        status: { $ne: "done" }
      });
    } 
    // 👤 MEMBER → ONLY OWN TASKS
    else {
      total = await Task.countDocuments({ assignedTo: userId });

      completed = await Task.countDocuments({
        assignedTo: userId,
        status: "done"
      });

      pending = await Task.countDocuments({
        assignedTo: userId,
        status: { $ne: "done" }
      });

      overdue = await Task.countDocuments({
        assignedTo: userId,
        deadline: { $lt: new Date() },
        status: { $ne: "done" }
      });
    }

    res.json({ total, completed, pending, overdue });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};