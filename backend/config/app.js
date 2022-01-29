const express = require("express");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
require("./passport");

const errorHandler = require("../middleware/errorHandler");
const setRoutes = require("../routes");

const router = express.Router();
const app = express();

app.use(compression());
app.use(helmet());
app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", setRoutes(router));
app.use("/api", errorHandler);

// Heroku deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build/")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/", "index.html"));
  });
}

module.exports = app;
