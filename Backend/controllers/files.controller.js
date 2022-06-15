// const Person = require("../models/file.model");
const data = require("./example-data.json");
console.log(data)
exports.all_files = (req, res) => {
  res.send(data);
};



