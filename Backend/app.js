const express = require("express");
const cors = require("cors");
const person = require("./routes/landing.route");

const app = express();
const port = 5000;

//Database connection script

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/list_files", person);

app.listen(port, () => {
    console.log(person)
    console.log("Server is starting ... here: localhost:" + port)
});