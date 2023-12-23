const mariadb = require("mariadb");
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const path = require("path");

//const { ideaRouter } = require("./routes/idea.routes");

const cors = require("cors");

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

//app.use("/show-ideas", ideaRouter);

app.use(cors());

app.listen(80, function () {
  console.log("CORS-enabled web server listening on port 80");
});

//LISTEN
app.listen(PORT, () => console.log(`Server started: http://${HOST}:${PORT}/`));

//POOL

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

//EXPRESS
// the wrapper around the connection & try-catch-finally is just nameless arrow function to create an asynchronous environment.
app.get("/", async (req, res) => {
  //res.json({ msg: "api is connected" });
  res.sendFile(path.join(__dirname, "../client/idea.html"));
});

//SHOW ALL IDEAS
app.get("/show-ideas", async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log("database is connected");

    const data = await connection.query(`SELECT * FROM brilliant_minds.ideas`);
    res.send(data);
    console.log(data);

    //res.sendFile(path.join(__dirname, "../client/idea.html"));
  } catch (err) {
    console.log(err);

    throw err;
    ß;
  } finally {
    if (connection) connection.end();
  }
});

//ADD
app.post("/add", async (req, res) => {
  let connection;
  try {
    console.log(req);
    connection = await pool.getConnection();
    console.log("Idea created successfully");
    const statement = await connection.prepare(
      "INSERT INTO  brilliant_minds.ideas (title, description) VALUES (?, ?)"
    );
    const data = await statement.execute([
      req.body.title,
      req.body.description,
    ]);
    console.log(data);
    res.send({ query: true });
  } catch (error) {
    throw error;
  } finally {
    if (connection) connection.end();
  }
});

//DELETE
app.delete("/delete", async (req, res) => {
  let connection;
  try {
    console.log(req);
    connection = await pool.getConnection();
    const statement = await connection.prepare(
      "DELETE FROM ideas WHERE id = ?"
    );
    const data = await statement.execute([req.body.id]);
    console.log(data);
    res.send({ query: true });
  } catch (error) {
    throw error;
  } finally {
    if (connection) connection.end();
  }
});

//UPDATE

app.patch("/update", async (req, res) => {
  let connection;
  try {
    console.log(req);
    connection = await pool.getConnection();
    const statement = await connection.prepare(
      "UPDATE title, description FROM ideas WHERE id = ?"
    );
    const data = await statement.execute([
      req.body.id,
      req.body.title,
      req.body.description,
    ]);
    console.log(data);
    res.send({ query: true });
  } catch (error) {
    throw error;
  } finally {
    if (connection) connection.end();
  }
});

/*




/*app.get("/ideas/:id", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});
*/

//UPDATE IDEAS
/*
app.get("/ideas/:id", async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log("update is connected");

    const id = request.params.id;
    const prepare = await connection.prepare(
      `SELECT * FROM ideas WHERE id = "${id}"`
    );
    const data = await prepare.execute([req.params.id]);
    res.send(data);
    console.log(prepare);
  } catch (err) {
    console.log(err);

    throw err;
  } finally {
    if (connection) connection.end();
  }
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

app.post("/ideas/:id", function (request, response, next) {
  const id = request.params.id;

  const title = request.body.title;

  const description = request.body.description;

  var query = `
	UPDATE ideas 
	SET title = "${title}", 
	description = "${description}", 
	WHERE id = "${id}"
	`;

  connection.query(query, function (error, data) {
    if (error) {
      throw error;
    } else {
      request.flash("success", "Sample Data Updated");
      response.redirect("/ideas");
    }
  });
});



*/
