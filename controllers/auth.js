const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../middleware/asyncWrapper");
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a New User
const signup = asyncWrapper(async (req, res) => {
  const { password, confirmPassword } = req.body;
  if (!confirmPassword) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Please input confirm password.",
    });
  }
  if (confirmPassword !== password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Password and confirm password does not match.",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  });
  res.status(StatusCodes.CREATED).json({
    msg: `Account for ${user.firstName} is created. Redirecting....`,
  });
});

// Login User
const login = asyncWrapper(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `User does not exist.`,
    });
  }
  const passwordMatch = await bcrypt.compare(req.body.password, user.password);
  if (!passwordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      msg: "Invalid credentials.",
    });
  }
  const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  res.status(StatusCodes.OK).json({
    msg: "Login is Successful. Redirecting...",
    name: user.firstName,
    token: token,
  });
});

module.exports = { signup, login };
