const express = require("express");
const app = express();
require("dotenv").config();
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const authMiddleWare = require("./middleware/authentication");
const connectDb = require("./db/connectDb");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// middleWare
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xss());

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  })
);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", authMiddleWare, userRouter);
app.use(notFound);
app.use(errorHandler);

const port = 8000 || process.env.PORT;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is running on port: ${port}`);
    });
  } catch (err) {
    console.log(err.message);
  }
};

start();
