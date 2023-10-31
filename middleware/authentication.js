const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const authorization = async (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken || !authToken.startsWith("Bearer")) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      msg: "Please provide token.",
    });
  }
  const token = authToken.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        msg: "Invalid token.",
      });
    }
    const { email } = payload;
    req.user = { email };
    next();
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};

module.exports = authorization;
