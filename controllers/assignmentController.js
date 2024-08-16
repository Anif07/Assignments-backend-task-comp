const Assignment = require("../models/assignmentModel");

const AssignmentController = {
  createAssignment: (req, res) => {
    const { title, description } = req.body;
    const teacher_id = req.user.username;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    Assignment.create(title, description, teacher_id, (err, result) => {
      if (err) throw err;
      res
        .status(201)
        .json({ msg: "Successfully Created Assignment", id: result.insertId });
    });
  },

  getAssignments: (req, res) => {
    const teacher_id = req.user.username;

    Assignment.findByTeacherId(teacher_id, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  },

  updateAssignment: (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;
    const teacher_id = req.user.username;

    if (!id) {
      return res.status(400).json({ message: "Please Enter ID" });
    }

    if (!id || Object.keys(updateFields).length === 0) {
      return res
        .status(400)
        .json({ message: "Assignment ID and fields to update are required" });
    }

    Assignment.updateById(id, updateFields, teacher_id, (err, result) => {
      if (err) throw err;
      if (result.affectedRows === 0) {
        return res
          .status(403)
          .json({ message: "Not authorized to update this assignment" });
      }
      res.json({ message: "Assignment updated successfully" });
    });
  },

  deleteAssignment: (req, res) => {
    const { id } = req.params;
    console.log(id);

    if (!id) {
      return res.status(400).json({ message: "Please Enter ID" });
    }

    Assignment.deleteById(id, req.user.username, (err, result) => {
      if (err) throw err;
      if (result.affectedRows === 0) {
        return res
          .status(403)
          .json({ message: "Not authorized to delete this assignment" });
      }
      res.json({ message: "Assignment deleted successfully" });
    });
  },
};

module.exports = AssignmentController;
