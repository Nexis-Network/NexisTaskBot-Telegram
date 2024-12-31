const express = require("express");
const router = express.Router();

const gameController = require("../../controllers/game");
const tgMiddleware = require("../../middlewares/tg");

// Use POST for routes that accept request body data
router.post("/upscore", tgMiddleware.tgauth_required, gameController.upscore);
router.post("/getscore", tgMiddleware.tgauth_required, gameController.getscore);
router.post("/getref", tgMiddleware.tgauth_required, gameController.getref);



module.exports = router;