const express = require("express");
const AssignmentController = require("../controllers/assignmentController");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authenticateToken, AssignmentController.createAssignment);
router.get("/", authenticateToken, AssignmentController.getAssignments);
router.put("/:id", authenticateToken, AssignmentController.updateAssignment);
router.put("/", authenticateToken, AssignmentController.updateAssignment);
router.delete("/:id", authenticateToken, AssignmentController.deleteAssignment);
router.delete("/", authenticateToken, AssignmentController.deleteAssignment);

module.exports = router;
