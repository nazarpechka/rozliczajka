const { agent, app } = require("./config/setup");
const isManager = require("../middleware/isManager");
const isParticipant = require("../middleware/isParticipant");
const authenticate = require("../middleware/authenticate");
const errorHandler = require("../middleware/errorHandler");

const {
  createManager,
  createParticipant,
  createGroup,
  fakeId,
} = require("./utils");

let manager;
let participant;

beforeAll(async () => {
  app.get(
    "/authenticate",
    authenticate,
    (req, res) => {
      res.send({ message: "success" });
    },
    errorHandler
  );
  app.get(
    "/ismanager",
    authenticate,
    isManager,
    (req, res) => {
      res.send({ message: "success" });
    },
    errorHandler
  );
  app.get(
    "/isparticipant",
    authenticate,
    isParticipant,
    (req, res) => {
      res.send({ message: "success" });
    },
    errorHandler
  );
  manager = await createManager(agent, "manager");
  participant = await createParticipant(agent, "participant");
});

describe("authenticate", () => {
  test("happy authenticate", (done) => {
    agent
      .get("/authenticate")
      .set("Authorization", `Bearer ${manager.token}`)
      .then((res) => {
        expect(res.body.message).toBe("success");
        done();
      })
      .catch(done);
  });

  test("no token", (done) => {
    agent.get("/authenticate").expect(401, done);
  });

  test("invalid token", (done) => {
    agent
      .get("/authenticate")
      .set("Authorization", "Bearer blabladummy")
      .expect(401, done);
  });
});

describe("isManager", () => {
  test("happy isManager", (done) => {
    agent
      .get("/ismanager")
      .set("Authorization", `Bearer ${manager.token}`)
      .then((res) => {
        expect(res.body.message).toBe("success");
        done();
      })
      .catch(done);
  });

  test("participant", (done) => {
    agent
      .get("/ismanager")
      .set("Authorization", `Bearer ${participant.token}`)
      .expect(403)
      .then((res) => {
        expect(res.body.message).toBe(
          "You should be a manager to do this action!"
        );
        done();
      })
      .catch(done);
  });
});

describe("isParticipant", () => {
  test("happy isParticipant", (done) => {
    agent
      .get("/isparticipant")
      .set("Authorization", `Bearer ${participant.token}`)
      .then((res) => {
        expect(res.body.message).toBe("success");
        done();
      })
      .catch(done);
  });

  test("manager", (done) => {
    agent
      .get("/isparticipant")
      .set("Authorization", `Bearer ${manager.token}`)
      .expect(403)
      .then((res) => {
        expect(res.body.message).toBe(
          "You should be a participant to do this action!"
        );
        done();
      })
      .catch(done);
  });
});
