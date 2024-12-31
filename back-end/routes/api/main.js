var express = require("express");
var router = express.Router();

var tgauthRouter = require("./tg");
var gameRouter = require("./game");

// Health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

router.use("/tg", tgauthRouter);
router.use("/game", gameRouter);

module.exports = router;