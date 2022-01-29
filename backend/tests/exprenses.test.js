const { agent, clear } = require("./config/setup");
const {
  createManager,
  createParticipant,
  createGroup,
  fakeId,
} = require("./utils");

let group;
let manager;
let participant;
let otherGroup;
let otherManager;
let otherParticipant;
let thirdParticipant;

const createEntities = async () => {
  manager = await createManager(agent, "manager");
  participant = await createParticipant(agent, "participant");
  group = await createGroup(agent, "test", manager.token);
  otherGroup = await createGroup(agent, "other test", manager.token);
  otherManager = await createManager(agent, "manager2");
  otherParticipant = await createParticipant(agent, "participant2");
  thirdParticipant = await createParticipant(agent, "participant3");
};

describe("POST /expenses", () => {
  beforeAll(createEntities);
  beforeAll(async () => {
    await agent
      .post(`/api/groups/${group}/participants`)
      .set("Authorization", `Bearer ${manager.token}`)
      .send({ userId: participant._id });
    await agent
      .post(`/api/groups/${group}/participants`)
      .set("Authorization", `Bearer ${manager.token}`)
      .send({ userId: otherParticipant._id });
  });

  test("happy create expense", (done) => {
    agent
      .post("/api/expenses")
      .set("Authorization", `Bearer ${participant.token}`)
      .send({
        amount: 10,
        group,
        subexpenses: [
          {
            user: participant._id,
            amount: 4.99,
          },
          {
            user: otherParticipant._id,
            amount: 4.99,
          },
        ],
      })
      .expect(200)
      .then((res) => {
        expect(res.body.subexpenses.length).toBe(2);
        expect(res.body.subexpenses[0].user).toBe(participant._id);
        expect(res.body.subexpenses[1].user).toBe(otherParticipant._id);

        done();
      })
      .catch(done);
  });

  test("group not found", (done) => {
    agent
      .post("/api/expenses")
      .set("Authorization", `Bearer ${participant.token}`)
      .send({
        amount: 10,
        group: fakeId,
        subexpenses: [
          {
            user: participant._id,
            amount: 4.99,
          },
          {
            user: otherParticipant._id,
            amount: 4.99,
          },
        ],
      })
      .expect(404, done);
  });

  test("group id invalid", (done) => {
    agent
      .post("/api/expenses")
      .set("Authorization", `Bearer ${participant.token}`)
      .send({
        amount: 10,
        group: "dummy",
        subexpenses: [
          {
            user: participant._id,
            amount: 4.99,
          },
          {
            user: otherParticipant._id,
            amount: 4.99,
          },
        ],
      })
      .expect(400, done);
  });

  test("not participant", (done) => {
    agent
      .post("/api/expenses")
      .set("Authorization", `Bearer ${thirdParticipant.token}`)
      .send({
        amount: 10,
        group,
        subexpenses: [
          {
            user: participant._id,
            amount: 4.99,
          },
          {
            user: otherParticipant._id,
            amount: 4.99,
          },
        ],
      })
      .expect(403, done);
  });

  test("one of subexpense users is not participant", (done) => {
    agent
      .post("/api/expenses")
      .set("Authorization", `Bearer ${participant.token}`)
      .send({
        amount: 10,
        group,
        subexpenses: [
          {
            user: participant._id,
            amount: 4.99,
          },
          {
            user: thirdParticipant._id,
            amount: 4.99,
          },
        ],
      })
      .expect(400, done);
  });

  test("sum of expenses don't add up", (done) => {
    agent
      .post("/api/expenses")
      .set("Authorization", `Bearer ${participant.token}`)
      .send({
        amount: 15,
        group,
        subexpenses: [
          {
            user: participant._id,
            amount: 4.99,
          },
          {
            user: otherParticipant._id,
            amount: 4.99,
          },
        ],
      })
      .expect(400, done);
  });

  afterAll(clear);
});

describe("GET /expenses/:id", () => {
  let expense;
  beforeAll(createEntities);
  beforeAll(async () => {
    await agent
      .post(`/api/groups/${group}/participants`)
      .set("Authorization", `Bearer ${manager.token}`)
      .send({ userId: participant._id });
    await agent
      .post(`/api/expenses`)
      .set("Authorization", `Bearer ${participant.token}`)
      .send({
        amount: 10,
        group,
        subexpenses: [
          {
            user: participant._id,
            amount: 10,
          },
        ],
      })
      .then((res) => {
        expense = res.body._id;
      });
  });

  test("happy get expense", (done) => {
    agent
      .get(`/api/expenses/${expense}`)
      .set("Authorization", `Bearer ${participant.token}`)
      .expect(200)
      .then((res) => {
        expect(res.body._id).toBe(expense);

        done();
      })
      .catch(done);
  });

  test("not found expense", (done) => {
    agent
      .get(`/api/expenses/${fakeId}`)
      .set("Authorization", `Bearer ${participant.token}`)
      .expect(404, done);
  });

  test("incorrect expense id", (done) => {
    agent
      .get("/api/expenses/dummy")
      .set("Authorization", `Bearer ${participant.token}`)
      .expect(400, done);
  });

  test("not participant in group", (done) => {
    agent
      .get(`/api/expenses/${expense}`)
      .set("Authorization", `Bearer ${otherParticipant.token}`)
      .expect(403, done);
  });

  afterAll(clear);
});
