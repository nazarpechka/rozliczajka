const agent = require("./config/setup");

const signup = {
  login: "test",
  password: "abc123",
  email: "test@gmail.com",
  name: "John",
  surname: "Doe",
  birthDate: "2000-01-01",
  isParticipant: true,
};

const login = {
  login: "test",
  password: "abc123",
};

describe("POST /api/auth/signup", () => {
  test("happy user registration", (done) => {
    agent
      .post("/api/auth/signup")
      .send(signup)
      .expect(200)
      .then((res) => {
        expect(res.body.login).toBe("test");
        expect(res.body.password).toBeFalsy();
        done();
      })
      .catch(done);
  });
  test("no login provided", (done) => {
    agent
      .post("/api/auth/signup")
      .send({ ...signup, login: undefined })
      .expect(400, done);
  });
  test("no password provided", (done) => {
    agent
      .post("/api/auth/signup")
      .send({ ...signup, password: undefined })
      .expect(400, done);
  });
  test("no email provided", (done) => {
    agent
      .post("/api/auth/signup")
      .send({ ...signup, email: undefined })
      .expect(400, done);
  });
  test("incorrect login provided", (done) => {
    agent
      .post("/api/auth/signup")
      .send({ ...signup, login: "ab" })
      .expect(400, done);
  });
  test("duplicate login provided", (done) => {
    agent
      .post("/api/auth/signup")
      .send(signup)
      .expect(409)
      .then((res) => {
        expect(res.body.message).toBe(
          "An account with that login: test already exists!"
        );
        done();
      })
      .catch(done);
  });
  test("incorrect password provided", (done) => {
    agent
      .post("/api/auth/signup")
      .send({ ...signup, password: "123" })
      .expect(400, done);
  });
  test("duplicate email provided", (done) => {
    agent
      .post("/api/auth/signup")
      .send({ ...signup, login: "dummy" })
      .expect(409)
      .then((res) => {
        expect(res.body.message).toBe(
          "An account with that email: test@gmail.com already exists!"
        );
        done();
      })
      .catch(done);
  });
  test("incorrect email provided", (done) => {
    agent
      .post("/api/auth/signup")
      .send({ ...signup, email: "dummy" })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe(
          "User validation failed: email: Invalid email."
        );
        done();
      })
      .catch(done);
  });
  test("incorrect birthDate provided", (done) => {
    agent
      .post("/api/auth/signup")
      .send({ ...signup, birthDate: "dummy" })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toMatch(
          /birthDate: Cast to date failed for value/
        );
        done();
      })
      .catch(done);
  });
});

describe("POST /api/auth/login", () => {
  test("happy user login", (done) => {
    agent
      .post("/api/auth/login")
      .send(login)
      .expect(200)
      .then((res) => {
        expect(res.body.login).toBe("test");
        expect(res.body.token).toBeTruthy();
        done();
      })
      .catch(done);
  });
  test("no login provided", (done) => {
    agent
      .post("/api/auth/login")
      .send({ password: login.password })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Missing credentials");
        done();
      })
      .catch(done);
  });
  test("no password provided", (done) => {
    agent
      .post("/api/auth/login")
      .send({ login: login.login })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Missing credentials");
        done();
      })
      .catch(done);
  });
  test("wrong login provided", (done) => {
    agent
      .post("/api/auth/login")
      .send({ login: "dummy", password: login.password })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Incorrect login!");
        done();
      })
      .catch(done);
  });
  test("wrong password provided", (done) => {
    agent
      .post("/api/auth/login")
      .send({ login: login.login, password: "dummy" })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Incorrect password!");
        done();
      })
      .catch(done);
  });
});
