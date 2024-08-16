const db = require("../config/db");

const User = {
  findByUserId: (username, callback) => {
    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [username], callback);
  },
  createUser: (username, hashedPassword, callback) => {
    const query = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.query(query, [username, hashedPassword], callback);
  },
  findByUsername: (username, callback) => {
    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [username], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    });
  },
};

module.exports = User;
