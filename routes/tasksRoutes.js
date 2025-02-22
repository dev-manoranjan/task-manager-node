const express = require("express");
const Task = require("../models/Task");
const router = express.Router();
const auth = require("../middlewares/auth");

router.post("/", auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = new Task({ title, description, owner: req.user._id });
    await task.save();
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id });
    res.json(
      tasks.map((task) => ({
        id: task._id,
        title: task.title,
        description: task.description,
      }))
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({
      id: task._id,
      title: task.title,
      description: task.description,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const { title, description } = req.body;
    task.title = title;
    task.description = description;
    await task.save();
    res.json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    await Task.deleteOne({ _id: req.params.id, owner: req.user._id });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
