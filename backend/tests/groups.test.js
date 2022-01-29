const { agent, clear } = require("./config/setup");
const {
  createManager,
  createParticipant,
  createGroup,
  fakeId,
} = require("./utils");

const groupCreate = {
  name: "Test group",
  description: "test description",
  // To test if we can create an inactive group
  isActive: false,
};

let group;
let manager;
let participant;
let otherGroup;
let otherManager;
let otherParticipant;

const createEntities = async () => {
  manager = await createManager(agent, "manager");
  participant = await createParticipant(agent, "participant");
  group = await createGroup(agent, "test", manager.token);
  otherGroup = await createGroup(agent, "other test", manager.token);
  otherManager = await createManager(agent, "manager2");
  otherParticipant = await createParticipant(agent, "participant2");
};

describe("POST /groups", () => {
  beforeAll(createEntities);

  test("happy group", (done) => {
    agent
      .post("/api/groups")
      .set("Authorization", `Bearer ${manager.token}`)
      .send(groupCreate)
      .expect(200)
      .then((res) => {
        expect(res.body.name).toBe("Test group");
        expect(res.body.isActive).toBe(true);
        done();
      })
      .catch(done);
  });
  test("incorrect name", (done) => {
    agent
      .post("/api/groups")
      .set("Authorization", `Bearer ${manager.token}`)
      .send({ name: "ab", description: "description" })
      .expect(400, done);
  });

  afterAll(clear);
});

describe("GET /groups/:id", () => {
  beforeAll(createEntities);
  beforeAll(async () => {
    await agent
      .post(`/api/groups/${group}/participants`)
      .set("Authorization", `Bearer ${manager.token}`)
      .send({ userId: participant._id });
  });

  test("happy get group (manager)", (done) => {
    agent
      .get(`/api/groups/${group}`)
      .set("Authorization", `Bearer ${manager.token}`)
      .expect(200)
      .then((res) => {
        expect(res.body.name).toBe("test");
        expect(res.body._id).toBe(group);
        done();
      })
      .catch(done);
  });
  test("happy get group (participant)", (done) => {
    agent
      .get(`/api/groups/${group}`)
      .set("Authorization", `Bearer ${participant.token}`)
      .expect(200)
      .then((res) => {
        expect(res.body.name).toBe("test");
        expect(res.body._id).toBe(group);
        done();
      })
      .catch(done);
  });
  test("not found", (done) => {
    agent
      .get(`/api/groups/${fakeId}`)
      .set("Authorization", `Bearer ${manager.token}`)
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe("Group not found!");
        done();
      })
      .catch(done);
  });
  test("invalid id", (done) => {
    agent
      .get("/api/groups/dummy")
      .set("Authorization", `Bearer ${manager.token}`)
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Invalid value provided for _id");
        done();
      })
      .catch(done);
  });
  test("get group not participant", (done) => {
    agent
      .get(`/api/groups/${group}`)
      .set("Authorization", `Bearer ${otherParticipant.token}`)
      .expect(403)
      .then((res) => {
        expect(res.body.message).toBe("You are not allowed to view this group");
        done();
      })
      .catch(done);
  });
  test("get group not manager", (done) => {
    agent
      .get(`/api/groups/${group}`)
      .set("Authorization", `Bearer ${otherManager.token}`)
      .expect(403)
      .then((res) => {
        expect(res.body.message).toBe("You are not allowed to view this group");
        done();
      })
      .catch(done);
  });

  afterAll(clear);
});

describe("DELETE /groups/:id", () => {
  beforeAll(createEntities);

  test("happy path deactivate group", (done) => {
    agent
      .delete(`/api/groups/${group}`)
      .set("Authorization", `Bearer ${manager.token}`)
      .expect(200)
      .then((res) => {
        expect(res.body.isActive).toBe(false);
        done();
      })
      .catch(done);
  });
  test("not found", (done) => {
    agent
      .delete(`/api/groups/${fakeId}`)
      .set("Authorization", `Bearer ${manager.token}`)
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe("Group not found!");
        done();
      })
      .catch(done);
  });
  test("invalid id", (done) => {
    agent
      .delete("/api/groups/dummy")
      .set("Authorization", `Bearer ${manager.token}`)
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Invalid value provided for _id");
        done();
      })
      .catch(done);
  });
  test("already deactivated", (done) => {
    agent
      .delete(`/api/groups/${group}`)
      .set("Authorization", `Bearer ${manager.token}`)
      .expect(400, done);
  });
  test("not the manager of the group", (done) => {
    agent
      .delete(`/api/groups/${otherGroup}`)
      .set("Authorization", `Bearer ${otherManager.token}`)
      .expect(403, done);
  });

  afterAll(clear);
});

describe("POST /groups/:id/participants", () => {
  beforeAll(createEntities);
  beforeAll(async () => {
    await agent
      .delete(`/api/groups/${otherGroup}`)
      .set("Authorization", `Bearer ${manager.token}`);
  });

  test("happy add participant", (done) => {
    agent
      .post(`/api/groups/${group}/participants`)
      .set("Authorization", `Bearer ${manager.token}`)
      .send({ userId: participant._id })
      .expect(200)
      .then((res) => {
        expect(res.body.participants).toContain(participant._id);
        done();
      })
      .catch(done);
  });
  test("deactivated group", (done) => {
    agent
      .post(`/api/groups/${otherGroup}/participants`)
      .set("Authorization", `Bearer ${manager.token}`)
      .send({ userId: otherParticipant._id })
      .expect(400, done);
  });
  test("not the manager", (done) => {
    agent
      .post(`/api/groups/${group}/participants`)
      .set("Authorization", `Bearer ${otherManager.token}`)
      .send({ userId: otherParticipant._id })
      .expect(403, done);
  });
  test("alread added", (done) => {
    agent
      .post(`/api/groups/${group}/participants`)
      .set("Authorization", `Bearer ${manager.token}`)
      .send({ userId: participant._id })
      .expect(400, done);
  });
  test("not found user", (done) => {
    agent
      .post(`/api/groups/${group}/participants`)
      .set("Authorization", `Bearer ${manager.token}`)
      .send({ userId: fakeId })
      .expect(404, done);
  });
  test("invalid user id", (done) => {
    agent
      .post(`/api/groups/${group}/participants`)
      .set("Authorization", `Bearer ${manager.token}`)
      .send({ userId: "dummy" })
      .expect(400, done);
  });
  test("adding a manager", (done) => {
    agent
      .post(`/api/groups/${group}/participants`)
      .set("Authorization", `Bearer ${manager.token}`)
      .send({ userId: otherManager._id })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe(
          "You can't add a manager to the group participants!"
        );
        done();
      })
      .catch(done);
  });

  afterAll(clear);
});

describe("DELETE /groups/:id/participants", () => {
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

  test("happy remove participant", (done) => {
    agent
      .delete(`/api/groups/${group}/participants`)
      .set("Authorization", `Bearer ${manager.token}`)
      .send({ userId: participant._id })
      .expect(200)
      .then((res) => {
        expect(res.body.participants).not.toContain(participant._id);
        done();
      })
      .catch(done);
  });

  test("deactivated group", (done) => {
    agent
      .delete(`/api/groups/${otherGroup}/participants`)
      .set("Authorization", `Bearer ${manager.token}`)
      .send({ userId: otherParticipant._id })
      .expect(400, done);
  });
  test("not the manager", (done) => {
    agent
      .delete(`/api/groups/${group}/participants`)
      .set("Authorization", `Bearer ${otherManager.token}`)
      .send({ userId: otherParticipant._id })
      .expect(403, done);
  });
  test("already removed", (done) => {
    agent
      .delete(`/api/groups/${group}/participants`)
      .set("Authorization", `Bearer ${manager.token}`)
      .send({ userId: participant._id })
      .expect(400, done);
  });

  afterAll(clear);
});

describe("POST /groups/:id/leave", () => {
  beforeAll(createEntities);
  beforeAll(async () => {
    await agent
      .post(`/api/groups/${group}/participants`)
      .set("Authorization", `Bearer ${manager.token}`)
      .send({ userId: participant._id });
  });

  test("happy leave group", (done) => {
    agent
      .post(`/api/groups/${group}/leave`)
      .set("Authorization", `Bearer ${participant.token}`)
      .expect(200)
      .then((res) => {
        expect(res.body.participants).not.toContain(participant._id);
        done();
      })
      .catch(done);
  });

  test("not a participant", (done) => {
    agent
      .post(`/api/groups/${group}/leave`)
      .set("Authorization", `Bearer ${otherParticipant.token}`)
      .expect(403, done);
  });

  afterAll(clear);
});

describe("GET /groups/:id/expenses", () => {
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
      });
  });

  test("happy get expenses", (done) => {
    agent
      .get(`/api/groups/${group}/expenses`)
      .set("Authorization", `Bearer ${manager.token}`)
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBe(1);
        expect(res.body[0].subexpenses[0].user._id).toBe(participant._id);

        done();
      })
      .catch(done);
  });

  test("not participant", (done) => {
    agent
      .get(`/api/groups/${group}/expenses`)
      .set("Authorization", `Bearer ${otherParticipant.token}`)
      .expect(403, done);
  });

  test("not manager", (done) => {
    agent
      .get(`/api/groups/${group}/expenses`)
      .set("Authorization", `Bearer ${otherManager.token}`)
      .expect(403, done);
  });

  afterAll(clear);
});
