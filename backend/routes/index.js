const users = require("./users.route");
const groups = require("./groups.route");
const expenses = require("./expenses.route");
const auth = require("./auth.route");

module.exports = (router) => {
  users(router);
  groups(router);
  expenses(router);
  auth(router);

  return router;
};
