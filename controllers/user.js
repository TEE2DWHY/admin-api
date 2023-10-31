const asyncWrapper = require("../middleware/asyncWrapper");
const { StatusCodes } = require("http-status-codes");
const User = require("../model/User");

const openDashBoard = asyncWrapper(async (req, res) => {
  const email = req.user.email;
  const user = await User.findOne({ email: email });
  res.status(StatusCodes.OK).json({
    msg: "Welcome to AppStack Dashboard",
    name: user.firstName,
  });
});

module.exports = openDashBoard;
