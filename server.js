const express = require("express");
const path = require("path");
const app = express();
const logger = (req, res, next) => {
  const date = new Date();
  console.log(
    req.method,
    `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  );
  next();
};

app.get("/images/:img", (req, res) => {
  const { img } = req.params;
  res.sendFile(path.resolve(`../weather app/images/${img}`));
});
app.get("/songs/:song", (req, res) => {
  const { song } = req.params;
  res.sendFile(path.resolve(`../weather app/songs/${song}`));
});

app.get("/", logger, (req, res) => {
  res.sendFile(path.resolve("../weather app/index.html"));
});
app.listen(8080);
