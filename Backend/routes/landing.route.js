const express = require("express");
const router = express.Router();
const fileController = require("../controllers/files.controller");

router.get("/all", fileController.all_files);


module.exports = router;

