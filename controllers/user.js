const jwt = require("jsonwebtoken");
const asyncWrapper = require("../middleware/asyncWrapper");
const { StatusCodes } = require("http-status-codes");
const User = require("../model/User");

const openDashBoard = asyncWrapper(async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      msg: "Please Provide Token",
    });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        msg: "Invalid Token.",
      });
    }
    const email = decodedToken.email;
    const user = await User.findOne({ email: email });
    res.status(StatusCodes.OK).json({
      msg: "Welcome to AppStack Dashboard",
      name: user.firstName,
    });
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      msg: error.message,
    });
  }
});

module.exports = openDashBoard;
