const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const errorHandler = require("./middleware/errorHandler");
const setRoutes = require("./routes/index");

const router = express.Router();
const app = express();

const PORT = process.env.PORT || 4000;
const MONGODB_URL =
  "mongodb+srv://rozliczajka:Rozliczajka2022@cluster0.o33dn.mongodb.net/rozliczajka?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URL);

app.use(logger("dev"));
app.use(bodyParser.json());
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

app.listen(PORT, () => {
  console.log(`Rozliczajka is running on ${PORT} port`);
});
