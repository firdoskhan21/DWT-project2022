const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    gender: {type: String},
    age: {type: Number},
    email: {type: String},
    education: {type: String},
    salary: {type: Number},
    maritalStatus: {type: String},
});

module.exports = mongoose.model("Person", PersonSchema, "person");
// Dritter Parameter gilt für den Collection Namen