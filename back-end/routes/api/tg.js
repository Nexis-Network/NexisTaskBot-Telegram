var express = require("express");
var router = express.Router();

var tg = require("../../controllers/tg");

router.post("/auth", tg.auth);

module.exports = router;
