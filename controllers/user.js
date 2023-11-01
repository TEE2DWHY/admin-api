const asyncWrapper = require("../middleware/asyncWrapper");
const { StatusCodes } = require("http-status-codes");
const User = require("../model/User");

const openDashBoard = asyncWrapper(async (req, res) => {
  const id = req.user.id;
  const user = await User.findOne({ _id: id });
  res.status(StatusCodes.OK).json({
    msg: "Welcome to AppStack Dashboard",
    name: user.firstName,
  });
});

module.exports = openDashBoard;
