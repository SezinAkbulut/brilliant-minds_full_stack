import express from "express";
import path from "path";

const app = express();

app.get("/", (req, res) => {
  res.sendfile(path.join(__dirname), "landing.html");
});

server.get("/show-all", async (req, res) => {
  // database connection
  // execute query
  // send response with data
})(
  //GET
  async () => {
    const response = await fetch("http://localhost:3000/show-ideas");
    const data = await response.json();
    console.log(data);
  }
)();

//POST
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: userName, // variable with the value you want to send
  }),
};

(async () => {
  const response = await fetch("http://localhost:3000/new-idea", options);
  const data = await response.json();
  console.log(data);
})();
