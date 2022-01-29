const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
let mongod;

module.exports = {
  connect: async () => {
    mongod = await MongoMemoryServer.create();

    mongoose
      .connect(mongod.getUri())
      .catch((err) => console.error(`Connection to mongoDB failed: ${err}`));
  },
  disconnect: async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
  },

  clear: async () => {
    await mongoose.connection.dropDatabase();
  },
};
