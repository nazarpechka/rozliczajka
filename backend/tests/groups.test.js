const app = require("../app");
const request = require("supertest");

describe("POST /groups", () => {
  test("No token provided", (done) => {
    request(app)
      .post("/api/groups")
      .expect(401)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
