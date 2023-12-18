const mariadb = require("mariadb");
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/ideas/:id", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

app.listen(80, function () {
  console.log("CORS-enabled web server listening on port 80");
});

//POOL
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  connectionLimit: 5,
});

//EXPRESS

// the wrapper around the connection & try-catch-finally is just nameless arrow function to create an asynchronous environment.
(async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log("database is connected");

    const data = await connection.query(`SELECT * FROM brilliant_minds.ideas`);
    console.log(data);
  } catch (err) {
    console.log(err);

    throw err;
  } finally {
    if (connection) connection.end();
  }
})();

//PORT
const port = process.env.PORT;
app.listen(port, () =>
  console.log(`Server started: http://localhost:${port}/`)
);

app.get("/api", (req, res) => {
  res.json({
    text: "my api!",
  });
});
