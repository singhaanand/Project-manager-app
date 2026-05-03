const Task = require("../models/Task");

// Create Task (Admin assigns, Member self only)
exports.createTask = async (req, res) => {
  try {
    const { title, project, assignedTo, deadline } = req.body;

    if (!title || !project) {
      return res.status(400).json({ msg: "Title & Project required" });
    }

    let assignUser;

    // 👑 Admin → assign to anyone
    if (req.user.role === "admin") {
      if (!assignedTo) {
        return res.status(400).json({ msg: "Assign user required" });
      }
      assignUser = assignedTo;
    } 
    // 👤 Member → only self
    else {
      assignUser = req.user.id;
    }

    const task = await Task.create({
      title,
      project,
      assignedTo: assignUser,
      deadline
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get Tasks (User only sees own tasks)
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      assignedTo: req.user.id
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Update Status (Only assigned user allowed)
exports.updateStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // 🔒 Security: only assigned user can update
    if (task.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    task.status = req.body.status;
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};