const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

const ideaRouter = express.Router();

/*ideaRouter.get("/show-ideas", async (req, res) => {
  //const { title, description, created_at } = req.body;
  try {
    const data = await connection.query(`SELECT * FROM brilliant_minds.ideas`);
    //res.sendFile(path.join(__dirname, "../client/idea.html"));
    res.json(data);

    console.log(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }

  res.send({
    message: "all ideas page is working",
  });
});
*/
ideaRouter.get("/show-ideas", async (req, res) => {
  /*res.json({
    text: "my api!",
  });
  */
  /*res.send({
    message: "api is working",
  });*/
  /*
  const noteData = [
    {
      id: "1",
      title: "new note",
      description: "description of the idea",
      created_at: "date",
    },
    {
      id: "2",
      title: "new note 2",
      description: "description of the idea-2",
      created_at: "date-3",
    },
    {
      id: "3",
      title: "new note 3",
      description: "description of the idea-3",
      created_at: "date-3",
    },
  ];
  res.json(noteData);

  */
  let connection;
  try {
    connection = await pool.getConnection();
    console.log("database is connected");

    const data = await connection.query(`SELECT * FROM brilliant_minds.ideas`);

    //res.sendFile(path.join(__dirname, "../client/idea.html"));
    res.send(data);
    console.log(data);
  } catch (err) {
    console.log(err);

    throw err;
  } finally {
    if (connection) connection.end();
  }
});

/*
ideaRouter.post("/new-idea", async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Title and description are required" });
  }

  try {
    await createIdea(title, description);
    res.json({ message: "Idea created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

ideaRouter.delete("/delete-idea/:id", async (req, res) => {
  const ideaId = req.params.id;

  try {
    await deleteIdea(ideaId);
    res.json({ message: "Idea deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
*/
module.exports = { ideaRouter };
