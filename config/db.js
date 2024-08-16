const mysql = require("mysql2");
const SECRET_KEY = "Anif Nallayapalli";

const db = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12726369",
  password: "wfatdZJs1s",
  database: "sql12726369",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

module.exports = db;
