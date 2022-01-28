const { signup, login } = require("../controllers/auth.controller");

module.exports = (router) => {
  router.route("/auth/signup").post(signup);
  router.route("/auth/login").post(login);
};
