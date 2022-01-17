const user = require("./user");
const group = require("./group");
const expense = require("./expense");

module.exports = (router) => {
  user(router);
  group(router);
  expense(router);

  return router;
};
