const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoute");
const assignmentRoutes = require("./routes/assignmentRoutes");
const db = require("./config/db");
const app = express();
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/assignments", assignmentRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
