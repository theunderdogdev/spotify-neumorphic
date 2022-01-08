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

app.use("/statics", express.static(path.resolve("./static")));

app.get("/songs/:song", (req, res) => {
  const { song } = req.params;
  res.sendFile(path.resolve(`../weather app/songs/${song}`));
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./index.html"));
  // res.send('<img src="/statics/images/cover.jpeg">');
});
app.listen(process.env.PORT || 8080);
