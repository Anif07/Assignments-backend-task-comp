const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const SECRET_KEY = "Anif Nallayapalli";

const AuthController = {
  register: (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    User.findByUsername(username, (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        return res.status(400).json({ message: "Username already exists" });
      }

      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) throw err;

        User.createUser(username, hashedPassword, (err, result) => {
          if (err) throw err;
          res.status(201).json({ message: "User registered successfully" });
        });
      });
    });
  },

  login: (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    User.findByUsername(username, (err, results) => {
      if (err) throw err;

      if (results.length === 0) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }

      const user = results[0];

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;

        if (!isMatch) {
          return res
            .status(400)
            .json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ username: user.username }, SECRET_KEY, {
          expiresIn: "1h",
        });

        res.json({ token });
      });
    });
  },
};

module.exports = AuthController;
