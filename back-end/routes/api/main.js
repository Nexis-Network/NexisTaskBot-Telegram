var express = require("express");
var router = express.Router();

var tgauthRouter = require("./tg");
var gameRouter = require("./game");


router.use("/tg", tgauthRouter);
router.use("/game", gameRouter);



module.exports = router;