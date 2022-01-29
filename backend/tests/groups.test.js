const agent = require("./config/setup");

describe("POST /groups", () => {
  test("No token provided", (done) => {
    agent.post("/api/groups").expect(401, done);
  });
});
