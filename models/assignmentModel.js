const db = require("../config/db");

const Assignment = {
  create: (title, description, teacher_id, callback) => {
    const query =
      "INSERT INTO assignments (title, description, teacher_id) VALUES (?, ?, ?)";
    db.query(query, [title, description, teacher_id], callback);
  },
  findByTeacherId: (teacher_id, callback) => {
    const query = "SELECT * FROM assignments WHERE teacher_id = ?";
    db.query(query, [teacher_id], callback);
  },
  updateById: (id, updateFields, teacher_id, callback) => {
    let query = "UPDATE assignments SET ";
    const queryValues = [];

    for (const [key, value] of Object.entries(updateFields)) {
      query += `${key} = ?, `;
      queryValues.push(value);
    }

    query = query.slice(0, -2);

    query += " WHERE id = ? AND teacher_id = ?";
    queryValues.push(id, teacher_id);

    db.query(query, queryValues, callback);
  },
  deleteById: (id, teacher_id, callback) => {
    const query = "DELETE FROM assignments WHERE id = ? AND teacher_id = ?";
    db.query(query, [id, teacher_id], callback);
  },
};

module.exports = Assignment;
