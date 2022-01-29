const app = require("../../config/app");
const db = require("./db");
const request = require("supertest");
const agent = request.agent(app);

beforeAll(async () => {
  await db.connect();
});

afterAll(async () => {
  await db.disconnect();
});

module.exports = agent;
