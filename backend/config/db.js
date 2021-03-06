const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;
module.exports = {
  connect: async () => {
    mongoose
      .connect(MONGO_URL)
      .then(() => console.log("Connected to mongoDB"))
      .catch((err) => console.error(`Connection to mongoDB failed: ${err}`));
  },
  disconnect: async () => {
    await mongoose.connection.close();
  },
};
