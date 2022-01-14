const { createUser, getGroups, login } = require("../controllers/user");
const verifyToken = require("../middleware/authJwt");

module.exports = (router) => {
  router.route("/user/groups").get(verifyToken, getGroups);

  router.route("/user/signup").post(createUser);

  router.route("/user/login").get(login);
};
