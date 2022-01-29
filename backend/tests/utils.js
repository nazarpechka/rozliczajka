const UserModel = require("../models/user");

const createUser = async (agent, login) => {
  await agent.post("/api/auth/signup").send({
    login,
    password: "123456",
    email: `${login}@gmail.com`,
    name: "John",
    surname: "Doe",
    birthDate: "2000-01-01",
  });
};

const loginUser = async (agent, login) => {
  const res = await agent.post("/api/auth/login").send({
    login,
    password: "123456",
  });
  return res.body;
};

module.exports = {
  createManager: async (agent, login) => {
    await createUser(agent, login);

    const user = await UserModel.findOne({ login });
    user.isParticipant = false;
    await user.save();

    return await loginUser(agent, login);
  },

  createParticipant: async (agent, login) => {
    await createUser(agent, login);

    return await loginUser(agent, login);
  },

  createGroup: async (agent, name, token) => {
    const res = await agent
      .post("/api/groups")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name,
        description: name,
      });
    return res.body._id;
  },

  fakeId: "61f529f87c21e5a3484f952c",
};
