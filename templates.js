//this will have templates here which will be inserted into html via javascript
const fs = require("fs");
const path = require("path");
fs.readdir(path.resolve(__dirname, "songs"), (err, files) => {
  files.forEach((file) => {
    console.log(file);
  });
});
