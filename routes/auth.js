const router = require("express").Router();
const { login, signup } = require("../controllers/auth");

router.post("/login", login);
router.route("/signup").post(signup);

module.exports = router;
