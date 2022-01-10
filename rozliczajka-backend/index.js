const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const setRoutes = require('./routes/index');

const router = express.Router();
const app = express();

const PORT = 3000;
MONGODB_URL = 'mongodb+srv://rozliczajka:Rozliczajka2022@cluster0.o33dn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URL);

app.use(cors());

router.route('/')
  .get((_, res) => {
    res.send('Welcome to Rozliczajka API');
  });

app.use(bodyParser.json());
app.use(setRoutes(router));
app.listen(process.env.PORT || PORT, () => {
  console.log(`Rozliczajka API is running on ${PORT} port`);
});
