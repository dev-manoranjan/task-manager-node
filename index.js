const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const authRoutes = require("./routes/authRoutes");
const tasksRoutes = require("./routes/tasksRoutes");
require("dotenv").config();
require("./db");
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/tasks", tasksRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Task Manager API is working" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
