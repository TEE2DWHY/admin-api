const router = require("express").Router();
const openDashBoard = require("../controllers/user");

router.get("/dashboard", openDashBoard);

module.exports = router;
