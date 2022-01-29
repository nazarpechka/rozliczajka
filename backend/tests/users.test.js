const { agent, clear } = require("./config/setup");
const {
  createGroup,
  createManager,
  createParticipant,
  fakeId,
} = require("./utils");

let group;
let manager;
let participant;
let otherParticipant;

const createEntities = async () => {
  manager = await createManager(agent, "manager");
  participant = await createParticipant(agent, "participant");
  otherParticipant = await createParticipant(agent, "participant2");
  group = await createGroup(agent, "test", manager.token);
};

describe("GET /users", () => {
  beforeAll(createEntities);

  test("happy get users", (done) => {
    agent
      .get("/api/users")
      .set("Authorization", `Bearer ${manager.token}`)
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBe(3);

        done();
      })
      .catch(done);
  });

  afterAll(clear);
});

describe("GET /users/:id/groups", () => {
  beforeAll(createEntities);
  beforeAll(async () => {
    await agent
      .post(`/api/groups/${group}/participants`)
      .set("Authorization", `Bearer ${manager.token}`)
      .send({ userId: participant._id });
  });

  test("happy get user groups (participant)", (done) => {
    agent
      .get(`/api/users/${participant._id}/groups`)
      .set("Authorization", `Bearer ${participant.token}`)
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBe(1);

        done();
      })
      .catch(done);
  });

  test("happy get user groups (manager)", (done) => {
    agent
      .get(`/api/users/${participant._id}/groups`)
      .set("Authorization", `Bearer ${manager.token}`)
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBe(1);

        done();
      })
      .catch(done);
  });

  test("happy get manager groups", (done) => {
    agent
      .get(`/api/users/${manager._id}/groups`)
      .set("Authorization", `Bearer ${manager.token}`)
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBe(1);

        done();
      })
      .catch(done);
  });

  test("see other user groups", (done) => {
    agent
      .get(`/api/users/${participant._id}/groups`)
      .set("Authorization", `Bearer ${otherParticipant.token}`)
      .expect(403, done);
  });

  afterAll(clear);
});
